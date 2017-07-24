import '../breadcrumb/breadcrumb.scss';
import '../link/link.scss';


/**
 * @name Breadcrumb Ng
 * @category Angular Components
 * @description Displays a breadcrumb.
 * @example
   <example name="Breadcrumb Ng">
     <file name="index.html">
     <div ng-app="Example.breadcrumb" ng-strict-di>
       <div ng-controller="DemoCtrl as ctrl">
         <rg-breadcrumb label="First level" link="test/href1">
           <rg-breadcrumb label="Second level" on-click="ctrl.clickSecondLevel()">
            <span>Active level</span>
           </rg-breadcrumb>
         </rg-breadcrumb>
       </div>
     </div>
     </file>
     <file name="index.js">
       import angular from 'angular';
       import BreadcrumbNG from 'ring-ui/components/breadcrumb-ng/breadcrumb-ng';

       angular.module('Example.breadcrumb', [BreadcrumbNG])
         .controller('DemoCtrl', function () {
            this.clickSecondLevel =  () => alert('Second level was clicked');
         });
     </file>
   </example>
 */

/* global angular: false */

const angularModule = angular.module('Ring.breadcrumb', []);

angularModule.directive('rgBreadcrumb', function rgBreadcrumbDirective() {
  return {
    template: require('./breadcrumb-ng.html'),
    replace: true,
    transclude: true,
    restrict: 'E',

    scope: {
      label: '@',
      link: '@',
      onClick: '&'
    }
  };
});

export default angularModule.name;
