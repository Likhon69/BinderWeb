
var AssemblyWiseFieldRenameHelper = {

    leaveApplicationRename: function () {
        if (assembly.AssemblyInfoId == 16) {
            $("#lblSubordinatesName").html("Team leave status");
            $("#btnSubordinates").html("View team leave status");
        }
    },

    

    myProfileRename: function () {
        if (assembly.AssemblyInfoId == 16) {
            $(".lebelGrade").html("&nbsp;&nbsp;Work Level");
            $(".labelDivision").html("&nbsp;&nbsp;Business Line");
            $(".levelSection").html("&nbsp;&nbsp;COGNOS");
            $(".levelFacility").html("&nbsp;&nbsp;5X5 reporting Team");
            $(".levelSubSection").html("&nbsp;&nbsp;Team");
        }

    },

    myProfileHide: function () {
        if (assembly.AssemblyInfoId == 16) {
            $("#divFieldForceDetails").hide();
            $("#divPhotoGalary").hide();
            $("#divOffice").hide();


        }
    },

    employeeSeparationRename: function () {

        if (assembly.AssemblyInfoId == 16) {
            $(".lavelCompany").html("Company");
            $(".lebelGrade").html("Work Level");
            $(".labelDivision").html("Business Line");
            $(".levelSection").html("COGNOS");
            $(".levelFacility").html("5X5 reporting Team");
            $(".levelSubSection").html("Team");
        }

    },

    employeeSeparationHide: function () {
        if (assembly.AssemblyInfoId == 16) {
            $("#liReportDept").hide();
            $("#liCurrentReportingBoss").hide();
        }

    },

    employeePersonalManagementRename: function () {
        if (assembly.AssemblyInfoId == 16) {
            $(".lebelGrade").html("Work Level");
            $(".labelDivision").html("Business Line");
            $(".levelSection").html("COGNOS");
            $(".levelFacility").html("5X5 reporting Team");
            $(".levelSubSection").html("Team");
            $("#spnInternetProfileLink").html("AD ID");
            $("#lblReference").html("Employment Past Record");
            $("#lblInternetProfileLink").html("AD Account:");
            $("#lblOfficialFax").hide();
        }
        if (assembly.AssemblyInfoId == 20) {
            $("#lblOfferDate").html("Job Offer Date");
            $("#lblAppointmentDate").html("Appointment Letter Issue Date");
            $("#lblCompany").html("Organization/BU");
        }
    },

    employeePersonalManagementHide: function () {
        if (assembly.AssemblyInfoId == 16) {
            $("#idOriginalBirthDay").hide();
            $("#divNomineeShareSettings").hide();
            $("#pfNomineeAtchementDiv").hide();
            $("#divApproverRecomm").hide();
            $("#liIsReserved").hide();
            $("#liMembershipPanel").hide();
            $("#liExtraCurriculumActivitiesPanel").hide();
            $("#liEmpSkillPanel").hide();
            $('#IsAutisticBlock').hide();
        }

    },

    transferPromotionCurrentEmploymentRename: function () {
        if (assembly.AssemblyInfoId == 16) {
            $(".lavelCompany").html("Company");
            $(".lebelGrade").html("Work Level");
            $(".labelDivision").html("Business Line");
            $(".levelSection").html("COGNOS");
            $(".levelFacility").html("5X5 reporting Team");
            $(".levelSubSection").html("Team");
        }
        
    },

    transferPromotionCurrentEmploymentHide: function () {
        if (assembly.AssemblyInfoId == 16) {
            $("#liReportDept").hide();
            $("#liCurrentReportingBoss").hide();
        }

    },

    transferPromotionNewEmploymentRename: function () {
        if (assembly.AssemblyInfoId == 16) {
            $(".lavelCompanyNew").html("Company");
            $(".lebelGradeNew").html("Work Level");
            $(".labelDivisionNew").html("Business Line");
            $(".levelSectionNew").html("COGNOS");
            $(".levelFacilityNew").html("5X5 reporting Team");
            $(".levelSubSectionNew").html("Team");
        }
    },

    transferPromotionNewEmploymentHide: function () {
        if (assembly.AssemblyInfoId == 16) {
            $("#singleLayerReportTo").hide();
            $("#divNomineeShareSettings").hide();
            $("#pfNomineeAtchementDiv").hide();
            $("#divApproverRecomm").hide();
            $("#liIsReserved").hide();
        }

    },

    hrDashboardRename: function () {
        if (assembly.AssemblyInfoId == 16) {
            $(".labelDivision").html("Business Line");
        }
    },

    hrDashboardHide: function () {

    },

    assetDetailsRename: function () {
        if (assembly.AssemblyInfoId == 16) {
            $(".lebelGrade").html("Work Level");
            $(".labelDivision").html("Business Line");
            $(".levelSection").html("COGNOS");
            $(".levelFacility").html("5X5 reporting Team");
            $(".levelSubSection").html("Team");
        }
    },

    assetDetailsHide: function () {
        if (assembly.AssemblyInfoId == 16) {

        }

    },

    employeeReplacementRename: function () {
        if (assembly.AssemblyInfoId == 16) {
            $(".lavelCompany").html("Company");
            $(".lebelGrade").html("Work Level");
            $(".labelDivision").html("Business Line");
            $(".levelSection").html("COGNOS");
            $(".levelFacility").html("5X5 reporting Team");
            $(".levelSubSection").html("Team");
           
        }
    },

    employeeReplacementHide: function () {
        if (assembly.AssemblyInfoId == 16) {
            $(".lifieldForce").hide();
        }

    },

    outstationRename: function () {
        if (assembly.AssemblyInfoId == 16) {
            //$(".lavelCompany").html("Company");
            //$(".lebelGrade").html("Work Level");
            //$(".labelDivision").html("Business Line");
            //$(".levelSection").html("COGNOS");
            //$(".levelFacility").html("5X5 reporting Team");
            //$(".levelSubSection").html("CLASSIFICATION (5x5)");
        }
    },

    outstationHide: function () {
        if (assembly.AssemblyInfoId == 16) {
            $("#liProjectCode").hide();
            $("#liConveyanceAmount").hide();
            $("#liTransportDescription").hide();
        }

    },

    LeaveHide: function () {
        if (assembly.AssemblyInfoId == 16) {
            $(".lblDivision").html("Business Line");
        }
        if (assembly.AssemblyInfoId == 9) {
            $("#liLeaveResone").show();
        }
    },

    HideFromEmployeepersonelmanagement: function () {
        $(".clsbtnAddNewReligion").hide();
        $(".clsbtnAddNationality").hide();
        $(".clsbtnAddNewPassportIssuePlace").hide();
        $(".clsbtnAddNewPlaceOfBirth").hide();
        $(".clsbtnAddNewParmanentDistrict").hide();
        $(".clsbtnAddNewPresentThana").hide();
        $(".clsbtnAddNewPresentDistrict").hide();
        $(".clsbtnAddNewThana").hide();
    },

    HideFromPersonalProfile: function () {
        if (assembly.AssemblyInfoId == 16) {
            $("#idBirthIdentification").hide();
            $("#liAdditionalInfo").hide();
            $("#btnClearAll").hide();
            $("#liIdentificationMark").hide();
            $("#liHeight").hide();
            $("#liWeight").hide();
            $("#liHobby").hide();
           // 
            $("#liIdExperience").hide();
            $("#liRecType").hide();
            $("#liRecSource").hide();
            $("#liLnPr").hide();

        }

        if (assembly.AssemblyInfoId == 20) {
            $("#liShortName").hide();
            $("#liGpfNo").hide();
            $("#liApplicantId").hide();
            $("#liRequisitionId").hide();
            $("#liJobId").hide();
            $("#liRecType").hide();
            $("#liRecSource").hide();
            $("#liLnPr").hide();
        }
    },

    HideForPayrollAndRename: function () {
        if (assembly.AssemblyInfoId == 16) {
            $(".lavelCompany").html("Company");
            $(".lebelGrade").html("Work Level");
            $(".labelDivision").html("Business Line");
            $(".levelSection").html("COGNOS");
            $(".levelFacility").html("5X5 reporting Team");
            $(".levelSubSection").html("Team");


            $("#liReportDept").hide();
            $("#liCurrentReportingBoss").hide();

            $(".lavelCompanyNew").html("Company");
            $(".lebelGradeNew").html("Work Level");
            $(".labelDivisionNew").html("Business Line");
            $(".levelSectionNew").html("COGNOS");
            $(".levelFacilityNew").html("5X5 reporting Team");
            $(".levelSubSectionNew").html("Team");

            $("#singleLayerReportTo").hide();
            $("#divNomineeShareSettings").hide();
            $("#pfNomineeAtchementDiv").hide();
            $("#divApproverRecomm").hide();
            $("#liIsReserved").hide();
            $("#reportingDepartment").hide();
            $("#lireportTo").hide();
            $("#liSingleApprover").hide();
            $("#liSingleApproverDept").hide();





        }

    },

    OtAllocationFieldRename: function () {
        if (assembly.AssemblyInfoId == 16) {
            $(".labelCompany").html("Company");
            $(".labelLocation").html("Location");
            $(".labelDivision").html("Business Line");
            $(".labelSection").html("COGNOS");
            $(".labelFacility").html("5X5 reporting Team");
            $(".labelSubSection").html("Team");
            $(".labelAverageOtHour").html("Per Day Max. OT Hour");
        }
    },

    CommonReportFieldRename: function () {
        if (assembly.AssemblyInfoId == 16) {
            $(".labelCompany").html("Company");
            $(".labelLocation").html("Location");
            $(".labelDivision").html("Business Line");
            $(".labelSection").html("COGNOS");
            $(".labelFacility").html("5X5 reporting Team");
            $(".labelSubSection").html("Team");
            $(".labelAverageOtHour").html("Per Day Max. OT Hour");
        }
    },

    RecManpowerPlanningRename: function () {
        if (assembly.AssemblyInfoId == 16) {
            $("#lblCompany").html("Organization :");
            $("#lblBranch").html("Location :");
            $("#lblDivision").html("Business Line :");
            $("#lblDepartment").html("Department :");
            $("#lblFacility").html("5X5 reporting Team :");
            $("#lblSection").html("COGNOS :");
            $("#lblFunction").html("Team :");
        }
    },
    

    HideAndChangelabelFromEmployment: function () {
        
        if (assembly.AssemblyInfoId == 20) {
            $("#lblLocationName").html("Job Station <span class='redstart'>*</span>:");
            $("#liDivisionInfo").hide();
            $("#lblDepartmentNameDetails").html("Department/Function <span class='redstart'>*</span>:");
            $("#liSalaryLocation").hide();
            $(".levelFacility").html("Sub-Function");
            $(".labelDesignation").html("Functional Designation<span class='redstart'>*</span>:");
            $(".labelJoiningPost").html("Joining Position");
            
            $(".levelSubSection").html("Master Designation <span class='redstart'>*</span>:");
            $("#btnAddNewFunction").hide();
            $("#divApproverRecomm").hide();


        }
    },

    RenameFieldForceManagementSettings: function () {

        if (assembly.AssemblyInfoId == 17) {
            $("#divZoneSettings").html("Division Settings");
            $("#lgZoneSummary").html("Division Summary");
            $("#lgZoneDetails").html("Division Details");
            $("#lblZoneName").html("Division Name:<span class='redstart'>*</span>");
            $("#lblZoneCode").html("Division Code:<span class='redstart'>*</span>");
            $("#lblZoneNameForRegion").html("Division Name");
        }
    }

};