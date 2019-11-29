package patches.buildTypes

import jetbrains.buildServer.configs.kotlin.v2018_2.*
import jetbrains.buildServer.configs.kotlin.v2018_2.triggers.VcsTrigger
import jetbrains.buildServer.configs.kotlin.v2018_2.triggers.vcs
import jetbrains.buildServer.configs.kotlin.v2018_2.ui.*

/*
This patch script was generated by TeamCity on settings change in UI.
To apply the patch, change the buildType with id = 'A11yAudit'
accordingly, and delete the patch script.
*/
changeBuildType(RelativeId("A11yAudit")) {
    params {
        expect {
            param("npmjs.com.auth.key", "")
        }
        update {
            param("npmjs.com.auth.key", "credentialsJSON:7f08c5e7-ed45-4767-b103-5802c98c1d6c")
        }
    }

    triggers {
        val trigger1 = find<VcsTrigger> {
            vcs {
                branchFilter = "+:refs/heads/*"
            }
        }
        trigger1.apply {
            branchFilter = "+:*"
        }
    }
}
