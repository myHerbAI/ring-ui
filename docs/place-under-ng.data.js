window.source = {
  "title": "Place Under Ng",
  "url": "place-under-ng.html",
  "type": "js",
  "content": "/**\n * @name Place Under Ng\n * @tags Ring UI Language\n * @category Legacy Angular\n * @description Displays a sidebar that fills the entire right half of its container.\n * To make sidebar have fixed positioning under some other element (e.g. toolbar),\n * a selector for that element should be passed as placeUnderSibling parameter.\n * @example-file ./place-under-ng.examples.html\n */\n\nimport angular from 'angular';\nimport 'dom4';\nimport debounce from 'just-debounce-it';\nimport createResizeDetector from 'element-resize-detector';\n\nimport {getDocumentScrollTop} from '../global/dom';\n\nconst resizeDetector = createResizeDetector();\n\nconst angularModule = angular.module('Ring.place-under', []);\nangularModule.directive('rgPlaceUnder',\n  function rgPlaceUnderDirective($window, getClosestElementWithCommonParent, rgPlaceUnderHelper) {\n    return {\n      restrict: 'A',\n      link: function link(scope, iElement, iAttrs) {\n        const element = iElement[0];\n        const synchronizer = rgPlaceUnderHelper.createPositionSynchronizer(element, iAttrs, scope);\n\n        function startSyncing(placeUnderSelector) {\n          if (placeUnderSelector) {\n            scope.$evalAsync(() => {\n              const syncWith = getClosestElementWithCommonParent(element, placeUnderSelector);\n\n              if (syncWith) {\n                synchronizer.syncPositionWith(syncWith);\n              } else {\n                throw new Error('rgPlaceUnder cannot find element to sync with.');\n              }\n            });\n          }\n        }\n\n        iAttrs.$observe('rgPlaceUnder', startSyncing);\n      }\n    };\n  }\n);\n\n\nangularModule.factory('getClosestElementWithCommonParent',\n  function getClosestElementWithCommonParentFactory() {\n    return function getClosestElementWithCommonParent(currentElement, selector) {\n      const parent = currentElement.parentNode;\n      if (parent) {\n        return parent.query(selector) || getClosestElementWithCommonParent(parent, selector);\n      } else {\n        return null;\n      }\n    };\n  }\n);\n\n\nangularModule.factory('rgPlaceUnderHelper', $window => {\n  const DEBOUNCE_INTERVAL = 10;\n  const AFTER_SCROLL_RECHECK_INTERVAL = 50;\n  const HEIGHT_CHECK_INTERVAL = 50;\n\n  return {\n    DEBOUNCE_INTERVAL,\n    AFTER_SCROLL_RECHECK_INTERVAL,\n    HEIGHT_CHECK_INTERVAL,\n    createPositionSynchronizer: (element, iAttrs, scope) => {\n      const topOffset = parseInt(iAttrs.placeTopOffset, 10) || 0;\n      const syncHeight = iAttrs.syncHeight;\n\n      let syncBottom = [];\n      let removeScrollListener = [];\n\n      if (iAttrs.syncBottom) {\n        syncBottom = iAttrs.syncBottom.split(',');\n      }\n\n      function waitForNonZeroHeight(elementToCheck) {\n        return new Promise(resolve => {\n          function checkElementHeight() {\n            if (elementToCheck.offsetHeight === 0) {\n              $window.setTimeout(checkElementHeight, HEIGHT_CHECK_INTERVAL);\n            } else {\n              resolve();\n            }\n          }\n\n          checkElementHeight();\n        });\n      }\n\n      function onScroll(syncElement) {\n        const documentScrollTop = getDocumentScrollTop();\n        const documentOffsetHeight =\n          ($window.document.documentElement && $window.document.documentElement.offsetHeight) ||\n          $window.document.body.offsetHeight;\n\n        const syncedElementHeight = syncElement.offsetHeight;\n        const syncedElementOffsetTop = syncElement.getBoundingClientRect().top + documentScrollTop;\n\n        const bottom = syncedElementOffsetTop + syncedElementHeight;\n\n        const margin = Math.max(bottom - documentScrollTop, syncedElementHeight);\n\n        element.style.marginTop = `${margin + topOffset}px`;\n\n        if (syncHeight) {\n          /**\n           * Decrease height by margin value to make scroll work properly\n           */\n          let bottomOffset = 0;\n          if (syncBottom.length) {\n            for (let i = 0; i < syncBottom.length; i++) {\n              const syncBottomParams = syncBottom[i].split(';');\n              const elem = $window.document.querySelector(syncBottomParams[0]);\n              const extraMargin = syncBottomParams[1] ? parseInt(syncBottomParams[1], 10) : 0;\n\n              if (elem) {\n                const boundingRect = elem.getBoundingClientRect();\n\n                if (boundingRect.top === 0) {\n                  continue;\n                }\n\n                const marginTop = parseInt($window.getComputedStyle(elem).\n                  getPropertyValue('margin-top'), 10);\n                bottomOffset = documentOffsetHeight - boundingRect.top + marginTop + extraMargin;\n                if (bottomOffset < 0) {\n                  bottomOffset = 0;\n                }\n\n                break;\n              }\n            }\n          }\n\n          element.style.height = `calc(100% - ${parseInt(element.style.marginTop, 10) + bottomOffset}px)`;\n        }\n      }\n\n      function removeScrollListeners() {\n        removeScrollListener.map(cb => cb());\n        removeScrollListener = [];\n      }\n\n      function syncPositionWith(syncElement) {\n        removeScrollListeners();\n\n        const afterScrollFinishRecheck =\n          debounce(() => this.onScroll(syncElement), AFTER_SCROLL_RECHECK_INTERVAL);\n\n        const sidebarScrollListener = debounce(() => {\n          this.onScroll(syncElement);\n          afterScrollFinishRecheck();\n        }, DEBOUNCE_INTERVAL);\n\n        this.waitForNonZeroHeight(syncElement).then(sidebarScrollListener);\n\n        $window.addEventListener('scroll', sidebarScrollListener);\n        removeScrollListener.push(() => {\n          $window.removeEventListener('scroll', sidebarScrollListener);\n        });\n\n\n        removeScrollListener.push(scope.$watch('show', sidebarScrollListener));\n        removeScrollListener.push(scope.$on('rgPlaceUnder:sync', sidebarScrollListener));\n\n\n        const elementToHeightListening = iAttrs.listenToHeightChange\n          ? $window.document.querySelector(iAttrs.listenToHeightChange)\n          : $window.document.body;\n        resizeDetector.listenTo(elementToHeightListening, sidebarScrollListener);\n        removeScrollListener.\n          push(() => resizeDetector.removeAllListeners(elementToHeightListening));\n      }\n\n      scope.$on('$destroy', removeScrollListeners);\n\n      return {\n        waitForNonZeroHeight,\n        onScroll,\n        syncPositionWith\n      };\n    }\n  };\n});\n\nexport default angularModule.name;\n",
  "examples": [
    {
      "name": "Place Under Ng",
      "url": "examples/place-under-ng/place-under-ng.html",
      "disableAutoSize": true,
      "files": [
        {
          "type": "html",
          "content": "\n<div ng-app=\"Ring.place-under\" ng-strict-di>\n\n  <div class=\"head\">Scroll down to see the effect</div>\n  <div rg-place-under=\".target-element\" class=\"place-under\">\n    Element to be positioned under test element\n  </div>\n\n  <div class=\"target-element\">\n    Test element to sync with.\n  </div>\n\n  <div class=\"scrollable\">\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\n    tempor\n    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n    quis nostrud\n    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum\n    dolore eu fugiat nulla pariatur.\n    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui\n    officia deserunt mollit anim id est laborum.\n  </div>\n</div>\n  ",
          "showCode": true
        },
        {
          "type": "js",
          "content": "\nimport angular from 'angular';\nimport '@jetbrains/ring-ui/components/place-under-ng/place-under-ng';\nimport {getDocumentScrollTop} from '@jetbrains/ring-ui/components/global/dom';\n\nwindow.addEventListener('scroll', function () {\n  var target = document.querySelector('.target-element');\n\n  var scrolledTop = getDocumentScrollTop();\n  if (scrolledTop > 30) {\n    target.style.position = 'fixed';\n  } else {\n    target.style.position = 'static';\n  }\n});\n  ",
          "showCode": true
        },
        {
          "type": "css",
          "content": "\n@value unit from '../global/global.css';\n\n:global(.place-under) {\n  position: fixed;\n  top: 0;\n  right: 0;\n  width: 50%;\n  padding: calc(unit * 2);\n  background-color: #888;\n}\n\n:global(.head) {\n  height: 30px;\n}\n\n:global(.target-element) {\n  position: static;\n  top: 0;\n  width: 100%;\n  padding: calc(unit * 2);\n  background-color: #CCC;\n}\n\n:global(.scrollable) {\n  height: 1000px;\n  padding: calc(unit * 2);\n  padding-top: calc(unit * 8);\n  background-color: #EEE;\n}\n  ",
          "showCode": true
        }
      ]
    }
  ],
  "description": "Displays a sidebar that fills the entire right half of its container.\nTo make sidebar have fixed positioning under some other element (e.g. toolbar),\na selector for that element should be passed as placeUnderSibling parameter.",
  "attrs": {
    "name": "Place Under Ng",
    "tags": "Ring UI Language",
    "category": "Legacy Angular",
    "description": "Displays a sidebar that fills the entire right half of its container.\nTo make sidebar have fixed positioning under some other element (e.g. toolbar),\na selector for that element should be passed as placeUnderSibling parameter.",
    "example-file": "./place-under-ng.examples.html"
  }
};