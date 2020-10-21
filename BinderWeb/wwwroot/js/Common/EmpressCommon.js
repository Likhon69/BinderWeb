var accessArray=[];
var assembly=new Object();

var empressCommonManager={

	getAccountHeadByAccountCode: function(accountCode) {
		var data=AjaxManager.GetSingleObject("../AccountHeadSetup/GetAccountHeadByAccountCode","accountCode="+accountCode);
		return data;
	},

	CheckCompanyAccountByCompanyCode: function(companyCode) {
		var data=AjaxManager.GetSingleObject("../PFVoucher/CheckCompanyAccount","companyCode="+companyCode);
		return data;

	},

	GetHrisSettingsDetails: function() {
		var objStatus="";
		var jsonParam="";
		var serviceUrl="../HrisSettings/GetHrisSettingsDetails";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objStatus=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objStatus;
	},

	GetSystemSettingsDataByCompanyId: function(companyId) {
		var objStatus="";
		var jsonParam="companyId="+companyId;
		var serviceUrl="../SystemSettings/GetSystemSettingsDataByCompanyId";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objStatus=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objStatus;
	},

	GetHierarchyCompany: function() {
		var objCompany="";
		var jsonParam="";
		var serviceUrl="../Company/GetMotherCompany/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objCompany=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objCompany;
	},

	GetAllActiveCompany: function() {
		var objCompany="";
		var jsonParam="";
		var serviceUrl="../Company/GetAllActiveCompany/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objCompany=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objCompany;
	},

	GetAllActiveSection: function() {
		var objSection="";
		var jsonParam="";
		var serviceUrl="../Section/GetAllActiveSection/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objSection=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objSection;
	},

	GenerateBranchCombo: function(companyId) {
		var objBranch="";
		var jsonParam="companyId="+companyId;
		var serviceUrl="../../Branch/GetBranchByCompanyIdForCombo/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objBranch=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objBranch;
	},

	GetSalaryLocationComboData: function(companyId) {
		var objBranch="";
		var jsonParam="companyId="+companyId;
		var serviceUrl="../../Branch/GetSalaryLocationComboDataByCompanyId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objBranch=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objBranch;
	},

	GetDepartmentByCompanyId: function(companyId) {
		var objDepartment="";
		var jsonParam="companyId="+companyId;
		var serviceUrl="../../Department/GetDepartmentByCompanyId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objDepartment=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objDepartment;
	},

	GetDivisionByCompanyId: function(companyId) {
		var objDivision="";
		var jsonParam="companyId="+companyId;
		var serviceUrl="../../Division/GetDivisionByCompanyId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objDivision=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objDivision;
	},

	GetAllActiveFacility: function() {
		var objFacility="";
		var jsonParam="";
		var serviceUrl="../../Facility/GetAllActiveFacility/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objFacility=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objFacility;
	},

	GetDivisionDeptByCompanyIdAndDivisionId: function(companyId,divisionId) {
		var objDivisionDept="";
		var jsonParam="companyId="+companyId+"&divisionId="+divisionId;
		var serviceUrl="../../Division/GetDivisionDeptByCompanyIdAndDivisionId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objDivisionDept=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objDivisionDept;
	},

	GetActiveDepartmentByCompanyIdAndDivisionId: function(companyId,divisionId) {
		var objDivisionDept="";
		var jsonParam="companyId="+companyId+"&divisionId="+divisionId;
		var serviceUrl="../../Department/GetActiveDepartmentByCompanyIdAndDivisionIdWithDepartmentRestriction/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objDivisionDept=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objDivisionDept;
	},

	GetDepartmentFacilityByDepartmentId: function(departmentId) {
		var objDepartmentFacility="";
		var jsonParam="departmentId="+departmentId;
		var serviceUrl="../../Facility/GetDepartmentFacilityByDepartmentId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objDepartmentFacility=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objDepartmentFacility;
	},

	GetDepartmentSectionByDepartmentId: function(departmentId,companyId) {


		if(companyId==undefined) {
			companyId=0;
		}

		var objDepartmentSection="";
		var jsonParam="departmentId="+departmentId+"&companyId="+companyId;
		var serviceUrl="../../Section/GetDepartmentSectionByDepartmentId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objDepartmentSection=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objDepartmentSection;
	},

	GetFacilitySectionByFacilityId: function(facilityId) {
		var objFacilitySection="";
		var jsonParam="facilityId="+facilityId;
		var serviceUrl="../../Facility/GetFacilitySectionByFacilityId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objFacilitySection=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objFacilitySection;
	},

	GetSectionByCompanyDepartmentAndFacility: function(companyId,departmentId,facilityId) {

		if(companyId==undefined) {
			companyId=0;
		}
		if(departmentId==undefined) {
			departmentId=0;
		}
		if(facilityId==undefined) {
			facilityId=0;
		}

		var objSection="";

		var jsonParam="companyId="+companyId+"&departmentId="+departmentId+"&facilityId="+facilityId;

		var serviceUrl="../../Section/GetSectionByCompanyDepartmentAndFacility/";

		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objSection=jsonData;
		}
		function onFailed(error) {
			//debugger;
			window.alert(error.statusText);
		}
		return objSection;
	},


	GetRegionDivisionByRegionId: function(regionId) {
		var objRegionDivision="";
		var jsonParam="regionId="+regionId;
		var serviceUrl="../../Region/GetRegionDivisionByRegionId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objRegionDivision=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objRegionDivision;
	},

	GetMovementPolicy: function(hrRecordId) {
		var objDepartment="";
		var jsonParam="hrRecordId="+hrRecordId;
		var serviceUrl="../../Movement/GetMovementPolicyByHrRecordId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objDepartment=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objDepartment;
	},

	GetDepartmentAll: function() {
		var objDepartment="";
		var jsonParam="";
		var serviceUrl="../../Department/GetDepartmentAll/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objDepartment=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objDepartment;
	},

	GetEmployeeByCompanyIdAndBranchIdAndDepartmentId: function(companyId,branchId,departmentId) {
		var objEmployee="";
		var jsonParam="companyId="+companyId+"&branchId="+branchId+"&departmentId="+departmentId;
		var serviceUrl="../../Employee/GetEmployeeByCompanyIdAndBranchIdAndDepartmentId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objEmployee=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objEmployee;
	},

	GetEmployeeByDepartmentId: function(departmentId) {
		var objEmployee="";
		var jsonParam="departmentId="+departmentId;
		var serviceUrl="../../Employee/GenerateEmployeeByDepartmentId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objEmployee=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objEmployee;
	},

	GetEmployeeType: function() {
		var objEmployeeType="";
		var jsonParam="";

		var serviceUrl="../../Employee/GetEmployeeTypeForCombo/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objEmployeeType=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objEmployeeType;
	},

	GetRegularEmployeeTypes: function() {
		var objEmployeeType="";
		var jsonParam="";

		var serviceUrl="../../Employee/GetRegularEmployeeTypes/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objEmployeeType=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objEmployeeType;
	},

	GetNonRegularEmployeeType: function() {
		var objEmployeeType="";
		var jsonParam="";

		var serviceUrl="../../Employee/GetNonRegularEmployeeType/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objEmployeeType=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objEmployeeType;
	},

	GetSalaryStatus: function() {
		var objEmployeeType="";
		var jsonParam="";

		var serviceUrl="../../Status/GetSalaryStatus/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objEmployeeType=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objEmployeeType;
	},

	GetSalaryStatusForAdmin: function() {
		var objEmployeeType="";
		var jsonParam="";

		var serviceUrl="../../Status/GetSalaryStatusForAdmin/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objEmployeeType=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objEmployeeType;
	},

	GetOtherPaymentStatus: function() {
		var objEmployeeType="";
		var jsonParam="";

		var serviceUrl="../../Status/GetOtherPaymentStatus/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objEmployeeType=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objEmployeeType;
	},

	GetGratuityStatus: function() {
		var objEmployeeType="";
		var jsonParam="";

		var serviceUrl="../../Status/GetGratuityStatus/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objEmployeeType=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objEmployeeType;
	},

	GetPayrollStatus: function() {
		var objEmployeeType="";
		var jsonParam="";

		var serviceUrl="../../Status/GetPayrollStatus/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objEmployeeType=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objEmployeeType;
	},

	GetBonusStatus: function() {
		var objEmployeeType="";
		var jsonParam="";

		var serviceUrl="../../Status/GetBonusStatus/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objEmployeeType=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objEmployeeType;
	},

	GetProjectStatus: function() {

		var objEmployeeType="";
		var jsonParam="";

		var serviceUrl="../Status/GetProjectStatus/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objEmployeeType=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objEmployeeType;
	},

	GetCoffStatus: function() {
		var objStatus="";
		var jsonParam="";
		var serviceUrl="../Status/GetCoffStatus/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objStatus=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objStatus;
	},

	GetKraStatus: function() {
		var objStatus="";
		var jsonParam="";
		var serviceUrl="../Status/GetKraStatus/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objStatus=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objStatus;
	},

	GetLeaveForwadingStatus: function() {
		var objStatus="";
		var jsonParam="";
		var serviceUrl="../Status/GetLeaveForwadingStatus/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objStatus=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objStatus;
	},

	GetAccessPermissionForCurrentUserForHrAccountsModule: function() {
		var objEmployeeType="";
		var jsonParam="";

		var serviceUrl="../../Status/GetAccessPermissionForCurrentUserForHrAccountsModule/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objEmployeeType=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objEmployeeType;
	},

	GetAccessPermissionForCurrentUserForHrPayrollModule: function() {
		var objEmployeeType="";
		var jsonParam="";

		var serviceUrl="../../Status/GetAccessPermissionForCurrentUserForHrPayrollModule/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objEmployeeType=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objEmployeeType;
	},

	GetActionButtonByState: function(stateId) {
		var objAction="";
		var jsonParam="stateId="+stateId;
		var serviceUrl="../Status/GetActionByStateIdAndUserId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objAction=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objAction;
	},


	GetActionByPermission: function(stateId,hrRecordId,applicationId) {
		var objAction="";
		var jsonParam="stateId="+stateId+"&applicantId="+hrRecordId+"&applicationId="+applicationId;
		var serviceUrl="../ApproverRecommender/GetActionByPermission/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objAction=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objAction;
	},

	GetClient: function(companyId) {
		var objClient="";
		var jsonParam="companyId="+companyId;
		var serviceUrl="../Client/GetClient/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objClient=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objClient;
	},

	GenerateDesignationCombo: function(companyId) {
		var objDesignation="";
		var jsonParam="companyId="+companyId+"&status="+1;
		var serviceUrl="../Designation/GetAllDesignationByCompanyIdAndStatus/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objDesignation=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objDesignation;
	},

	GenerateDesignationByDepartmentIdCombo: function(departmentId) {
		var objDesignation="";
		var jsonParam="departmentId="+departmentId+"&status="+1;
		var serviceUrl="../Designation/GenerateDesignationByDepartmentIdCombo/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objDesignation=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objDesignation;
	},

	GenerateDesignationByCompanyIdComboData: function(companyId) {
		var objDesignation="";
		var jsonParam="companyId="+companyId+"&status="+1;
		var serviceUrl="../Designation/GenerateDesignationByCompanyIdCombo/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objDesignation=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objDesignation;
	},

	GenerateDesignationAllCombo: function() {
		var objDesignation="";
		var jsonParam="";
		var serviceUrl="../Designation/GenerateDesignationAllCombo/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objDesignation=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objDesignation;
	},

	GetGradeByCompanyAndPayroll: function(companyId,payrollTypeId) {
		var objGrade="";
		var jsonParam="companyId="+companyId+"&payrollTypeId="+payrollTypeId;
		var serviceUrl="../GradeSettings/GetGradeByCompanyAndPayroll/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objGrade=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objGrade;
	},

	GenerateGradeComboByCompanyId: function(companyId) {

		var objGrade="";
		var jsonParam="companyId="+companyId;
		var serviceUrl="../Grade/GenerateGradeComboByCompanyId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objGrade=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return objGrade;
	},

	GetGradeComboByCompanyIdAndDesignationId: function(companyId,designationId) {

		companyId=companyId>0?companyId:0;
		designationId=designationId>0?designationId:0;

		var objGrade="";
		var jsonParam="companyId="+companyId+"&designationId="+designationId;
		var serviceUrl="../Grade/GetGradeComboByCompanyIdAndDesignationId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objGrade=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return objGrade;
	},

	GetAllActiveGradeCombo: function() {

		var objGrade="";
		var jsonParam="";
		var serviceUrl="../Grade/GenerateGradeCombo/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objGrade=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objGrade;
	},

	GetPayrollSettingsByGradeId: function(gradeId) {
		var objGrade="";
		var jsonParam="gradeId="+gradeId;
		var serviceUrl="../GradeSettings/GetPayrollSettingsByGradeId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objGrade=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objGrade;
	},

	GetCertificateType: function() {
		var objCertificateType="";
		var jsonParam="";
		var serviceUrl="../CertificateType/LoadActiveCertificateType/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objCertificateType=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objCertificateType;
	},

	GetIncidentType: function() {
		var objIncidentType="";
		var jsonParam="";
		var serviceUrl="../Incident/GetIncidentType/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objIncidentType=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objIncidentType;
	},

	GetAgencyByAgencyType: function(agencyType) {
		var objAgency="";
		var jsonParam="agencyType="+agencyType;
		var serviceUrl="../CNF/GetAgencyByAgencyType/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objAgency=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objAgency;
	},

	GetAgentInformationByAgencyId: function(agencyId) {
		var objAgent="";
		var jsonParam="agencyId="+agencyId;
		var serviceUrl="../CNF/GetAgentInformationByAgencyId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objAgent=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return objAgent;
	},

	GetTaskTypeInformation: function() {
		var objTaskType="";
		var jsonParam="";
		var serviceUrl="../ProjectManagement/GetTaskTypeInformation/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objTaskType=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return objTaskType;
	},

	GetLeaveAccumulationType: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../LeaveEncashmentForwarding/GetLeaveAccumulationType/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetLeaveTypeByAccumulationType: function(accumulationType,hrRecordId) {
		var obj="";
		var jsonParam="accumulationType="+accumulationType+"&hrRecordId="+hrRecordId;
		var serviceUrl="../LeaveEncashmentForwarding/GetLeaveTypeByAccumulationType/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetActiveLeaveType: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../LeavePolicy/GetActiveLeaveType/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetPlanedLeaveType: function(hrRecordId,fiscalYearId) {
		var obj="";
		var jsonParam="";
		var serviceUrl="../LeavePlan/GetPlanedLeaveType/?hrRecordId="+hrRecordId+"&fiscalYearId="+fiscalYearId;
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GenerateBonusType: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../Bonus/GenerateBonusType/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetCtcInformation: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../Payroll/GetCtcInformation/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetCtcInformationByOperator: function(opType) {
		var obj="";
		var jsonParam="opType="+opType;
		var serviceUrl="../Payroll/GetCtcInformationByOperator/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetCtcTypes: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../Payroll/GetCtcTypes/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetCtcTypesByCategory: function(categoryId) {
		var obj="";
		var jsonParam="";
		var serviceUrl="../PayrollAdjustment/GetCtcPolicyComboData/?categoryId="+categoryId;
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetCtcTypesByCategoryForDailyAllowance: function(categoryId) {
		var obj="";
		var jsonParam="";
		var serviceUrl="../PayrollAdjustment/GetCtcPolicyComboDataForDailyAllowance/?categoryId="+categoryId;
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetCtcByCategoryForFieldBenefitDailyAllowance: function(categoryId) {
		var obj="";
		var jsonParam="";
		var serviceUrl="../PayrollAdjustment/GetCtcPolicyComboDataForFieldBenefitDailyAllowance/?categoryId="+categoryId;
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetLoanTypes: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../LoanAdvancedisburseSchedule/GetLoanTypes/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	populateRepostingType: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../TransferPromotion/GetRepostingType/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GenerateFunctionCombo: function() {
		var objFunction="";
		var JsonParam="";
		var serviceUrl="../Function/GetFunctionDataForCombo/";
		AjaxManager.GetJsonResult(serviceUrl,JsonParam,false,false,onSuccess,onFailed);
		function onSuccess(jsonData) {
			objFunction=jsonData;
		}
		function onFailed() {
			window.alert(error.statusText);
		}

		return objFunction;
	},

	GenerateRsmRegionCombo: function() {
		var objFunction="";
		var JsonParam="";
		var serviceUrl="../RSMRegion/GetAllActiveRsmRegionComboData/";
		AjaxManager.GetJsonResult(serviceUrl,JsonParam,false,false,onSuccess,onFailed);
		function onSuccess(jsonData) {
			objFunction=jsonData;
		}
		function onFailed() {
			window.alert(error.statusText);
		}
		return objFunction;
	},

	GetAllActiveRsmRegionComboDataForFieldForceAttendance: function() {
		var objFunction="";
		var JsonParam="";
		var serviceUrl="../RSMRegion/GetAllActiveRsmRegionComboDataForFieldForceAttendance/";
		AjaxManager.GetJsonResult(serviceUrl,JsonParam,false,false,onSuccess,onFailed);
		function onSuccess(jsonData) {
			objFunction=jsonData;
		}
		function onFailed() {
			window.alert(error.statusText);
		}
		return objFunction;
	},

	GeneratePSOLocationCombo: function(rsmCode) {
		var objFunction="";
		var JsonParam="";
		var serviceUrl="../PSOLocation/GetPsoLocationByRsmCode?RsmCode="+rsmCode;
		AjaxManager.GetJsonResult(serviceUrl,JsonParam,false,false,onSuccess,onFailed);
		function onSuccess(jsonData) {
			objFunction=jsonData;
		}
		function onFailed() {
			window.alert(error.statusText);
		}

		return objFunction;
	},

	GenerateShiftComboByCompanyAndBranch: function(companyId,branchId) {
		var objShift="";
		var jsonParam="companyId="+companyId+"&branchId="+branchId;
		var serviceUrl="../Calender/GenerateShiftComboByCompanyAndBranch/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objShift=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objShift;
	},

	GetShiftData: function() {
		var objShift=new Object();
		var jsonParam="";
		var serviceUrl="../Calender/GetShiftData/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objShift=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objShift;
	},

	GetCtcCategoryInformation: function() {
		var obj="";
		var JsonParam="";
		var serviceUrl="../PayrollAdjustment/GetCtcCategory";
		AjaxManager.GetJsonResult(serviceUrl,JsonParam,false,false,onSuccess,onFailed);
		function onSuccess(jsonData) {

			obj=jsonData;
		}
		function onFailed() {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetGradeType: function() {
		var obj="";
		var JsonParam="";
		var serviceUrl="../GradeType/GetGradeTypeForCombo";
		AjaxManager.GetJsonResult(serviceUrl,JsonParam,false,false,onSuccess,onFailed);
		function onSuccess(jsonData) {

			obj=jsonData;
		}
		function onFailed() {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetTrainingType: function() {
		var obj="";
		var JsonParam="";
		var serviceUrl="../TrainingInfo/GetTrainingTypeForCombo";
		AjaxManager.GetJsonResult(serviceUrl,JsonParam,false,false,onSuccess,onFailed);
		function onSuccess(jsonData) {

			obj=jsonData;
		}
		function onFailed() {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetTrainingCategory: function() {
		var obj="";
		var JsonParam="";
		var serviceUrl="../TrainingInfo/GetTrainingCategoryForCombo";
		AjaxManager.GetJsonResult(serviceUrl,JsonParam,false,false,onSuccess,onFailed);
		function onSuccess(jsonData) {

			obj=jsonData;
		}
		function onFailed() {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetDataForAnyCombo: function(serviceUrl) {
		var obj="";
		var JsonParam="";
		//var serviceUrl = "../TrainingInfo/GetTrainingTypeForCombo";
		AjaxManager.GetJsonResult(serviceUrl,JsonParam,false,false,onSuccess,onFailed);
		function onSuccess(jsonData) {

			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);

		}

		return obj;
	},

	GenerateCommonGrid: function(ctlId,url,columns) {
		$("#"+ctlId).kendoGrid({
			dataSource: empressCommonManager.gridDataSource(url,50),
			pageable: {
				refresh: true,
				serverPaging: true,
				serverFiltering: true,
				serverSorting: true

			},

			filterable: true,
			sortable: true,
			columns: columns,
			editable: false,
			navigatable: true,
			selectable: "row",
		});
	},

	GenerateCommonGridWithPaging: function(ctlId,url,columns,pageSize) {
		$("#"+ctlId).kendoGrid({
			dataSource: empressCommonManager.gridDataSource(url,pageSize),
			pageable: {
				refresh: true,
				serverPaging: true,
				serverFiltering: true,
				serverSorting: true,
				pageSizes: [10,20,50,100,150,200,500,1000,2000,3000,4000,5000,6000,7000,8000]
			},
			xheight: 300,
			filterable: true,
			sortable: true,
			columns: columns,
			editable: false,
			navigatable: true,
			selectable: "row",
		});
	},

	GenerateCommonGridWithoutPaging: function (ctlId, url, columns, pageSize) {



	    $("#" + ctlId).kendoGrid({
	        dataSource: empressCommonManager.gridDataSource(url, pageSize),
	        
	        xheight: 300,
	        filterable: true,
	        sortable: true,
	        columns: columns,
	        editable: false,
	        navigatable: true,
	        selectable: "row",
	        scrollable: { virtual: true },
	    });
	},

	gridDataSource: function(url,pageSize) {

		var gridDataSource=new kendo.data.DataSource({
			type: "json",
			serverPaging: true,

			serverSorting: true,

			serverFiltering: true,

			allowUnsort: true,

			pageSize: pageSize,

			transport: {
				read: {

					url: url,

					type: "POST",
					cache: false,
					async: false,

					dataType: "json",

					contentType: "application/json; charset=utf-8"
				},

				parameterMap: function(options,operation) {

					if(operation!=="read"&&options.models) {
						return { models: kendo.stringify(options.models) };
					} else {
						return JSON.stringify(options);
					}

				}
			},
			schema: { data: "Items",total: "TotalCount" }
		});
		return gridDataSource;
	},

	GetFiscalYear: function(companyId) {
		var objFiscale="";
		var jsonParam="";
		var serviceUrl="../../Company/GetFiscalYear/?companyId="+companyId;
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objFiscale=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objFiscale;
	},

	GetTrainingInfo: function() {
		var trainigInfos=new kendo.data.DataSource({
			transport: {
				read: {
					url: "../TrainingInfo/GetTrainingInfoForCombo/",
					dataType: "json"
				}
			}
		});

		return trainigInfos;

	},

	GetTrainingInfoAfterComplete: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../TrainingCertificateUpload/GetTrainingInfoComboAfterComplete";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetLeaveTypeByCompanyIdAndhrRecordId: function(companyId,hrRecordId) {
		var obj="";
		var jsonParam="";
		var serviceUrl="../../LeavePolicy/GetLeaveTypeByCompanyIdAndhrRecordId/?companyId="+companyId+"&hrRecordId="+hrRecordId;
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetLeaveTypeByhrRecordId: function(hrRecordId) {
		var obj="";
		var jsonParam="";
		var serviceUrl="../../LeavePolicy/SelectAllLeaveBalanceForLeaveApplicationEditByHrRecordId/?hrRecordId="+hrRecordId;
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetLeaveReason: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../LeaveReason/GetLeaveReason";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetCountryComboData: function() {
		var objCountry="";
		var jsonParam="";
		var serviceUrl="../Nationality/GetCountryComboData";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailde);

		function onSuccess(jsonData) {
			objCountry=jsonData;
		}
		function onFailde(error) {
			window.alert(error.statusText);
		}

		return objCountry;
	},

	GetDistrictComboData: function() {
		var objDistrict="";
		var jsonParam="";
		var serviceUrl="../District/GetDistrictComboData";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objDistrict=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return objDistrict;
	},

	GetVenueComboData: function() {
		var objVenue="";
		var jsonParam="";
		var serviceUrl="../Venue/GetVenueComboData";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objVenue=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return objVenue;
	},

	GetThanaComboData: function() {
		var objThana="";
		var jsonParam="";
		var serviceUrl="../Thana/GetThanaComboData";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objThana=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return objThana;
	},

	GetThanaComboDatabyDistrictId: function(districtId) {
		var objThana="";
		var jsonParam="districtId="+districtId;
		var serviceUrl="../Thana/GetThanaComboDataByDistrictId";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objThana=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return objThana;
	},

	GetKraYearConfigData: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../KRA/GetKraYearConfigData";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetAllBank: function() {
		var objBank="";
		var jsonParam="";
		var serviceUrl="../BankBranch/GetAllBank/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objBank=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objBank;
	},

	GetAllBankForSalary: function() {
		var objBank="";
		var jsonParam="";
		var serviceUrl="../BankBranch/GetAllBankForSalary/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objBank=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objBank;
	},

	GetBranchByBankId: function(bankId) {
		var objBank="";
		var jsonParam="bankId="+bankId;
		var serviceUrl="../BankBranch/GetBranchByBankId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objBank=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objBank;
	},

	GetAccountByBranchId: function(branchId) {
		var obj="";
		var jsonParam="branchId="+branchId;
		var serviceUrl="../BankBranch/GetAccountByBranchId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GenerateAccountComboByBranchIdAndCompanyArrayForSalary: function(branchId,companyArray,branchArray) {
		var obj="";
		var jsonParam="branchId="+branchId+"&companyArray="+JSON.stringify(companyArray)+"&branchArray="+JSON.stringify(branchArray);
		var serviceUrl="../BankBranch/GenerateAccountComboByBranchIdAndCompanyArrayForSalaryWithBranch/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetAllAccountHead: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../AccountHeadSetup/GetAllAccountHead/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetRootAccountHead: function(isManualHead) {
		var obj="";
		var jsonParam="";
		var serviceUrl="../AccountHeadSetup/GetRootAccountHead/?isManualHead="+isManualHead;
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetReligionComboData: function() {
		var objReligion="";
		var jsonParam="";
		var serviceUrl="../Religion/GetReligionComboData";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objReligion=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return objReligion;
	},

	GetPaybandComboData: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../Payband/GetPayband";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetEmployeeContributionAccountHeadHeadBySubject: function(subjectId) {
		var obj="";
		var jsonParam="";
		var serviceUrl="../SubjectOfAccounts/GetEmployeeContributionAccountHeadHeadBySubject/?subjectId="+subjectId;
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetCompanyContributionAccountHeadHeadBySubject: function(subjectId) {
		var obj="";
		var jsonParam="";
		var serviceUrl="../SubjectOfAccounts/GetCompanyContributionAccountHeadHeadBySubject/?subjectId="+subjectId;
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	SearchEmploymentInformationByEmployeeCode: function(empCode) {
		var obj=null;
		var param="employeeId="+empCode;
		var serviceUrl="../Employee/GetEmploymentByEmployeeId";
		AjaxManager.GetJsonResult(serviceUrl,param,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;

	},

	GetAccountHeadByRootHead: function(accountHeadId) {
		var obj="";
		var jsonParam="rootHead="+accountHeadId;
		var serviceUrl="../AccountHeadSetup/GetAccountHeadByRoot/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetEmploymentByEmployeeIdWithoutEmployeeTypeRestruction: function(empCode) {
		var obj=null;
		var param="employeeId="+empCode;
		var serviceUrl="../Employee/GetEmploymentByEmployeeIdWithoutEmployeeTypeRestruction";
		AjaxManager.GetJsonResult(serviceUrl,param,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;

	},

	SearchAccountHeadByAccountHeadCode: function(accountHeadCode) {
		var obj=null;
		var param="accountHeadCode="+accountHeadCode;
		var serviceUrl="../AccountHeadSetup/GetAccoutHeadInfoByAccountHeadCode";
		AjaxManager.GetJsonResult(serviceUrl,param,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;

	},

	SearchSubLedgerHeadBySubLedgerCodeAndLedgerType: function(subledgerCode,ledgerHeadId) {
		var obj=null;
		var param="sulgType="+ledgerHeadId+"&accountHeadCode="+subledgerCode;
		var serviceUrl="../AccountHeadSetup/GetSubLedgerInfoByCodeAndType";
		AjaxManager.GetJsonResult(serviceUrl,param,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;

	},

	GetVoucherType: function() {
		var obj=null;
		var param="";
		var serviceUrl="../AccountHeadSetup/GetVoucherType";
		AjaxManager.GetJsonResult(serviceUrl,param,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;

	},

	GetTransectionTypeByVoucherId: function(voucherId) {
		var obj=null;
		var param="voucherId="+voucherId;
		var serviceUrl="../AccountHeadSetup/GetTransectionTypeByVoucherId";
		AjaxManager.GetJsonResult(serviceUrl,param,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;

	},

	GetSubjectOfAccounts: function() {
		var obj=null;
		var param="";
		var serviceUrl="../SubjectOfAccounts/GetSubjectOfAccounts";
		AjaxManager.GetJsonResult(serviceUrl,param,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;

	},

	GetAllAccountHeadBySubjectId: function(subjectId) {

		var obj="";
		var jsonParam="subjectId="+subjectId;
		var serviceUrl="../AccountHeadSetup/GetAllAccountHeadBySubjectId/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetJobVacancyData: function() {
		var obj=null;
		var param="";
		var serviceUrl="../JobVacancy/GetJobVacancyComboData";
		AjaxManager.GetJsonResult(serviceUrl,param,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;

	},

	GetEmployeeByIdAndShortName: function(searchKey) {
		var result=new Object();
		var param="employeeId="+searchKey;
		var serviceUrl="../Employee/GetEmploymentByEmployeeId";
		AjaxManager.GetJsonResult(serviceUrl,param,false,false,function(jsonData) {
			result=jsonData;

		},function(error) {
			Message.Error("Internal Server Error");

		});
		return result;
	},

	GetTaxYearCombo: function() {

		var jsonParam="";
		var objTaxSlabYearCombo=new Object();
		var serviceUrl="../../TaxSlub/GetTaxSlabYearForCombo/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objTaxSlabYearCombo=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return objTaxSlabYearCombo;
	},

	GetCategoryComboData: function() {
		var objCategory="";
		var jsonParam="";
		var serviceUrl="../Asset/GetCategoryComboData/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objCategory=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objCategory;
	},

	GetCommonComboData: function(param,url) {
		var obj="";
		var jsonParam=param;
		var serviceUrl=url;
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetCompetencyComboData: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../CompetencySettings/GetCompetencyDataForCombo/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetCompetencyAreaSectionComboData: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../CompetencySettings/GetCompetencySectionDataForCombo/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetCompetencyLevelComboData: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../CompetencySettings/GetCompetencyLevelComboData/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetCompetencyAreaComboData: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../CompetencySettings/GetCompetencyAreaComboData/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetPmsTabData: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../PMSConfig/GetPmsConfigData/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetPmsInstructionData: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../PMSConfig/GetPmsInstructionData/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;
	},

	GetAllGroupData: function() {
		var obj=new Object();
		var jsonParam="";
		var serviceUrl="../Group/GetAllGroupName/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {


			obj=jsonData;

		}
		function onFailed(jqXHR,textStatus,errorThrown) {
			window.alert(errorThrown);
		}

		return obj;
	},

	GetBulkRosterChangeStatus: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../Status/GetBulkRosterChangeStatus/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;

	},

	GetOTAllocationChangeStatus: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../Status/GetOTAllocationChangeStatus/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return obj;

	},

	GetAccessPermisionForCurrentUser: function() {
		var objStatus="";
		var jsonParam="";
		var serviceUrl="../Group/GetAccessPermisionForCurrentUser/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			accessArray=[];
			for(var i=0;i<jsonData.length;i++) {
				accessArray.push(jsonData[i]);
			}
		}
		function onFailed(error) {

			AjaxManager.MsgBox('error','center','Error',error.statusText,[{ addClass: 'btn btn-primary',text: 'Ok',onClick: function($noty) { $noty.close(); } }]);
		}
	},

	GetAccessPermisionForCurrentUserAll: function() {
		var objStatus="";
		var jsonParam="";
		var serviceUrl="../Group/GetAccessPermisionForCurrentUserAll/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			accessArray=[];
			for(var i=0;i<jsonData.length;i++) {
				accessArray.push(jsonData[i]);
			}
		}
		function onFailed(error) {
			Message.Error(error.statusText);
		}
	},

	GetAccessPermisionForCurrentUserTrainingModule: function() {
		var objStatus="";
		var jsonParam="";
		var serviceUrl="../Group/GetAccessPermisionForCurrentUserTrainingModule/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			accessArray=[];
			for(var i=0;i<jsonData.length;i++) {
				accessArray.push(jsonData[i]);
			}
		}
		function onFailed(error) {

			AjaxManager.MsgBox('error','center','Error',error.statusText,[{ addClass: 'btn btn-primary',text: 'Ok',onClick: function($noty) { $noty.close(); } }]);
		}
	},

	GetAccessPermisionForCurrentUserRecruitmentModule: function() {
		var objStatus="";
		var jsonParam="";
		var serviceUrl="../Group/GetAccessPermisionForCurrentUserRecruitmentModule/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			accessArray=[];
			for(var i=0;i<jsonData.length;i++) {
				accessArray.push(jsonData[i]);
			}
		}
		function onFailed(error) {

			AjaxManager.MsgBox('error','center','Error',error.statusText,[{ addClass: 'btn btn-primary',text: 'Ok',onClick: function($noty) { $noty.close(); } }]);
		}
	},
	GetAccessPermisionForCurrentUserPerformanceModule: function() {
		var objStatus="";
		var jsonParam="";
		var serviceUrl="../Group/GetAccessPermisionForCurrentUserPerformanceModule/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			accessArray=[];
			for(var i=0;i<jsonData.length;i++) {
				accessArray.push(jsonData[i]);
			}
		}
		function onFailed(error) {

			AjaxManager.MsgBox('error','center','Error',error.statusText,[{ addClass: 'btn btn-primary',text: 'Ok',onClick: function($noty) { $noty.close(); } }]);
		}
	},
	PfEligibleAmountCombo: function() {
		var obj="";
		var jsonParam="";
		var serviceUrl="../PfLoan/PfeligibleAmount";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetFundYearCombo: function() {
		var jsonParam="";
		var objTaxSlabYearCombo=new Object();
		var serviceUrl="../../TaxSlub/GetFundYears/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);
		function onSuccess(jsonData) {
			objTaxSlabYearCombo=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return objTaxSlabYearCombo;
	},

	GetInvestmentType: function() {
		var obj=null;
		var param="";
		var serviceUrl="../Investment/GetInvestmentType";
		AjaxManager.GetJsonResult(serviceUrl,param,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetSubsidaryAccountCode: function(accHeadCode) {
		var ledgerAccCode=AjaxManager.GetSingleObject('../SubsidaryLedger/GetLedgerAccountCode','accountHeadCode='+accHeadCode);
		return ledgerAccCode;
	},

	GetInvestmentTypeById: function(typeId) {
		var obj=null;
		var param="typeId="+typeId;
		var serviceUrl="../Investment/GetInvestmentTypeById";

		AjaxManager.GetJsonResult(serviceUrl,param,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetVoucherNo: function(transectionType,vDate) {
		if(vDate==null||vDate=="") return "";
		if(transectionType!=null&&transectionType!="") {
			var data=AjaxManager.GetSingleObject("../Voucher/GetVoucherNo","transectionType="+transectionType+"&voucherDate="+kendo.toString(vDate,"MM/dd/yyyy"));
			return data;
		} else {
			return "";
		}
	},

	GetApprover: function(hrRecordId,moduleId) {
		return AjaxManager.GetSingleObject('../ApproverRecommender/GetApproverByHrRecordId','hrRecordId='+hrRecordId+'&moduleId='+moduleId);
	},

	GetEligibleComboType: function() {
		var obj=null;
		var param="";
		var serviceUrl="../Applicant/GetEligibleTypeComboData";

		AjaxManager.GetJsonResult(serviceUrl,param,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			obj=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}

		return obj;
	},

	GetEmployeeDetailsByEmployeeIdWithoutAnyRestriction: function(employeeId) {
		var result=new Object();
		var param="employeeId="+employeeId;
		var serviceUrl="../Employee/GetEmployeeDetailsByEmployeeIdWithoutAnyRestriction";
		AjaxManager.GetJsonResult(serviceUrl,param,false,false,function(jsonData) {
			result=jsonData;

		},function(error) {
			Message.Error(error.statusText);

		});
		return result;
	},

	GetEmployeeDetailsByHrRecordIdWithoutAnyRestriction: function(hrRecordId) {
		var result=new Object();
		var param="hrRecordId="+hrRecordId;
		var serviceUrl="../Employee/GetEmploymentByHrRecordId";
		AjaxManager.GetJsonResult(serviceUrl,param,false,false,function(jsonData) {
			result=jsonData;

		},function(error) {
			Message.Error(error.statusText);

		});
		return result;
	},

	GetRegionByZoneWiseForOrion: function(zoneId) {
		var objRegion="";
		var jsonParam="zoneId="+zoneId;
		var serviceUrl="../FFRegion/GetRegionByZoneWise/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objRegion=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objRegion;
	},

	GetAllZoneForOrion: function() {
		var objZone="";
		var jsonParam="";
		var serviceUrl="../Zone/GetAllZoneComboData/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objZone=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objZone;
	},

	GetRecruitmentTypeCombo: function() {
		var obj=null;
		obj=[{ RecruitmentTypeId: 1,RecruitmentTypeName: 'Regular' },
               { RecruitmentTypeId: 2,RecruitmentTypeName: 'Casual' }];
		return obj;
	},

	GetAssemblyInfo: function() {
		// //debugger;
		var jsonParam="";
		var objAssemblyInfo=new Object();
		var serviceUrl="../Assembly/GetAssemblyInformation/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			// //debugger;
			assembly=jsonData;
			objAssemblyInfo=jsonData;
		}

		function onFailed(error) {
			window.alert(error.statusText);
		}

		return objAssemblyInfo;
	},

	GetSalaryIncrementStatus: function() {
		var objSalaryIncrement="";
		var jsonParam="";

		var serviceUrl="../../Status/GetSalaryIncrementStatus/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {
			objSalaryIncrement=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objSalaryIncrement;
	},



	GetAllZoneCombo: function() {

		var objZone=new Object();
		var jsonParam="";
		var serviceUrl="../Zone/GetAllZoneComboData/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objZone=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objZone;
	},

	GetRegionComboByZoneId: function(zoneId) {

		var objRegion=new Object();

		var jsonParam="zoneId="+zoneId;
		var serviceUrl="../FFRegion/GetRegionByZoneWise/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objRegion=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objRegion;
	},

	GetAreaComboByRegionId: function(regionId) {

		var objArea=new Object();

		var jsonParam="regionId="+regionId;
		var serviceUrl="../Area/GetAreaByRegionWise/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objArea=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objArea;
	},

	GetTerritoryComboByAreaId: function(areaId) {

		var objTerritory=new Object();

		var jsonParam="areaId="+areaId;
		var serviceUrl="../Territory/GetTerritoryByAreaWise/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);

		function onSuccess(jsonData) {

			objTerritory=jsonData;
		}
		function onFailed(error) {
			window.alert(error.statusText);
		}
		return objTerritory;
	},

	GetEmployeeForKRA: function(hrRecordId) {
		var objEmployee=AjaxManager.GetSingleObject('../KRA/GetEmployeeKraPerformance',"hrRecordId="+hrRecordId);
		return objEmployee;

	},

	GetReviewAttribute: function() {
		return AjaxManager.GetSingleObject('../KRA/GetReviewAttribute',"");

	}


};









var PSOIdentity='';

var empressCommonHelper={
	IsHr: function() {
		var hr=false;
		var serviceUrl="../Group/IsHrUser/";
		AjaxManager.GetJsonResult(serviceUrl,"",false,false,onSuccess,onFailed);
		function onSuccess(jsonData) {
			hr=jsonData;
		}
		function onFailed(error) { }
		return hr;
	},
	IsModuleHr: function(moduleId) {
		//debugger;
		var hr=false;
		var jsonParam="moduleId="+moduleId;
		var serviceUrl="../Group/IsModuleHrUser/";
		AjaxManager.GetJsonResult(serviceUrl,jsonParam,false,false,onSuccess,onFailed);
		function onSuccess(jsonData) {
			hr=jsonData;
		}
		function onFailed(error) { }
		return hr;
	},
	initePanelBer: function(ctlDivId) {
		var original=$("#"+ctlDivId).clone(true);
		original.find(".k-state-active").removeClass("k-state-active");

		$(".configuration input").change(function() {
			var panelBar=$("#"+ctlDivId),
                clone=original.clone(true);

			panelBar.data("kendoPanelBar").collapse($("#"+ctlDivId+" .k-link"));

			panelBar.replaceWith(clone);

			initPanelBar();
		});

		var initPanelBar=function() {
			$("#"+ctlDivId).kendoPanelBar({ animation: { expand: { duration: 500, } } });
		};

		initPanelBar();

	},

	GenerareHierarchyCompanyCombo: function(identity) {
		// //debugger;
		var objCompany=empressCommonManager.GetHierarchyCompany();
		$("#"+identity).kendoComboBox({

			placeholder: "Select Company",
			dataTextField: "CompanyName",
			dataValueField: "CompanyId",
			dataSource: objCompany,

			animation: {
				close: {
					effects: "fadeOut zoom:out",
					duration: 300
				},
				open: {
					effects: "fadeIn zoom:in",
					duration: 300
				}
			}
		});
	},

	GenerareAllActiveCompanyCombo: function(identity) {
		// //debugger;
		var objAllCompany=empressCommonManager.GetAllActiveCompany();
		$("#"+identity).kendoComboBox({

			placeholder: "Select Company",
			dataTextField: "CompanyName",
			dataValueField: "CompanyId",
			dataSource: objAllCompany,
			animation: {
				close: {
					effects: "fadeOut zoom:out",
					duration: 300
				},
				open: {
					effects: "fadeIn zoom:in",
					duration: 300
				}
			}

		});
	},

	GenerareAllSectionCombo: function(identity) {
		var objAllSection=empressCommonManager.GetAllActiveSection();
		$("#"+identity).kendoComboBox({

			placeholder: "Select Cognos",
			dataTextField: "SectionName",
			dataValueField: "SectionId",
			dataSource: objAllSection,
			animation: {
				close: {
					effects: "fadeOut zoom:out",
					duration: 300
				},
				open: {
					effects: "fadeIn zoom:in",
					duration: 300
				}
			}

		});
	},

	GenerateBranchCombo: function(companyId,identity) {
		var objBranch=new Object();

		objBranch=empressCommonManager.GenerateBranchCombo(companyId);

		$("#"+identity).kendoComboBox({
			placeholder: "Select Location",
			dataTextField: "BranchName",
			dataValueField: "BranchId",
			dataSource: objBranch,
			animation: {
				close: {
					effects: "fadeOut zoom:out",
					duration: 300
				},
				open: {
					effects: "fadeIn zoom:in",
					duration: 300
				}
			}
		});
	},

	GenerateSalaryLocationCombo: function(companyId,identity) {
		var objSalaryLocation=new Object();

		objSalaryLocation=empressCommonManager.GetSalaryLocationComboData(companyId);

		$("#"+identity).kendoComboBox({
			placeholder: "Select Location",
			dataTextField: "SalaryLocationName",
			dataValueField: "SalaryLocation",
			dataSource: objSalaryLocation,
			animation: {
				close: {
					effects: "fadeOut zoom:out",
					duration: 300
				},
				open: {
					effects: "fadeIn zoom:in",
					duration: 300
				}
			}
		});
	},

	GenerateBonusType: function(identity,placeholder) {
		var obj=new Object();

		obj=empressCommonManager.GenerateBonusType();

		$("#"+identity).kendoComboBox({
			placeholder: placeholder,
			dataTextField: "BONUSTYPENAME",
			dataValueField: "BONUSTYPEID",
			dataSource: obj
		});
	},

	GetDepartmentByCompanyId: function(companyId,identity) {
		var objDepartment=new Object();

		objDepartment=empressCommonManager.GetDepartmentByCompanyId(companyId);

		$("#"+identity).kendoComboBox({
			placeholder: "Select Department",
			dataTextField: "DepartmentName",
			dataValueField: "DepartmentId",
			dataSource: objDepartment,
			animation: {
				close: {
					effects: "fadeOut zoom:out",
					duration: 300
				},
				open: {
					effects: "fadeIn zoom:in",
					duration: 300
				}
			}
		});

	},

	GenerateDivisionByCompanyId: function(companyId,identity) {
		var objDivision=new Object();

		objDivision=empressCommonManager.GetDivisionByCompanyId(companyId);

		if(assembly.AssemblyInfoId!=16&&assembly.AssemblyInfoId!=17) {

			var obj=new Object();
			obj.DivisionId=-1;
			obj.DivisionName="N/A";
			objDivision.unshift(obj);
		}


		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "DivisionName",
			dataValueField: "DivisionId",
			dataSource: objDivision,
			animation: {
				close: {
					effects: "fadeOut zoom:out",
					duration: 300
				},
				open: {
					effects: "fadeIn zoom:in",
					duration: 300
				}
			}
		});

	},

	GenerateDivisionDeptByCompanyIdAndDivisionId: function(companyId,divisionId,identity) {
		var objDivisionDept=new Object();

		objDivisionDept=empressCommonManager.GetDivisionDeptByCompanyIdAndDivisionId(companyId,divisionId);
		$("#"+identity).kendoComboBox({
			placeholder: "Select Department",
			dataTextField: "DepartmentName",
			dataValueField: "DepartmentId",
			dataSource: objDivisionDept,
			animation: {
				close: {
					effects: "fadeOut zoom:out",
					duration: 300
				},
				open: {
					effects: "fadeIn zoom:in",
					duration: 300
				}
			}

		});
	},

	GenerateDepartmentByCompanyIdAndDivisionIdWithDeptRestriction: function(companyId,divisionId,identity) {
		var objDivisionDept=new Object();

		objDivisionDept=empressCommonManager.GetActiveDepartmentByCompanyIdAndDivisionId(companyId,divisionId);
		$("#"+identity).kendoComboBox({
			placeholder: "Select Department",
			dataTextField: "DepartmentName",
			dataValueField: "DepartmentId",
			dataSource: objDivisionDept,
			animation: {
				close: {
					effects: "fadeOut zoom:out",
					duration: 300
				},
				open: {
					effects: "fadeIn zoom:in",
					duration: 300
				}
			}
		});
	},

	GenerateDepartmentFacilityByDepartmentId: function(departmentId,identity) {
		var objFacility=new Object();

		objFacility=empressCommonManager.GetDepartmentFacilityByDepartmentId(departmentId);

		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "FacilityName",
			dataValueField: "FacilityId",
			dataSource: objFacility,
			animation: {
				close: {
					effects: "fadeOut zoom:out",
					duration: 300
				},
				open: {
					effects: "fadeIn zoom:in",
					duration: 300
				}
			}
		});

	},

	GenerateFacilitySectionByFacilityId: function(facilityId,identity) {
		var objSection=new Object();

		objSection=empressCommonManager.GetFacilitySectionByFacilityId(facilityId);

		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "SectionName",
			dataValueField: "SectionId",
			dataSource: objSection,
			animation: {
				close: {
					effects: "fadeOut zoom:out",
					duration: 300
				},
				open: {
					effects: "fadeIn zoom:in",
					duration: 300
				}
			}
		});
	},

	GenerateSectionByCompanyDepartmentAndFacility: function(companyId,departmentId,facilityId,identity) {
		var objSection=new Object();

		objSection=empressCommonManager.GetSectionByCompanyDepartmentAndFacility(companyId,departmentId,facilityId);

		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "SectionName",
			dataValueField: "SectionId",
			dataSource: objSection,
			animation: { close: { effects: "fadeOut zoom:out",duration: 300 },open: { effects: "fadeIn zoom:in",duration: 300 } }
		});

	},

	GenerateAllActiveFacility: function(identity) {
		var objFacility=new Object();

		objFacility=empressCommonManager.GetAllActiveFacility();

		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "FacilityName",
			dataValueField: "FacilityId",
			dataSource: objFacility,
			animation: { close: { effects: "fadeOut zoom:out",duration: 300 },open: { effects: "fadeIn zoom:in",duration: 300 } }
		});

	},

	GetDepartmentAll: function(identity) {
		var objDepartment=new Object();

		objDepartment=empressCommonManager.GetDepartmentAll();

		$("#"+identity).kendoComboBox({
			placeholder: "Select Department",
			dataTextField: "DepartmentName",
			dataValueField: "DepartmentId",
			dataSource: objDepartment,
			animation: { close: { effects: "fadeOut zoom:out",duration: 300 },open: { effects: "fadeIn zoom:in",duration: 300 } }
		});

	},

	GenerateAllActiveSection: function(identity) {
		var objSection=new Object();

		objSection=empressCommonManager.GetAllActiveSection();

		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "SectionName",
			dataValueField: "SectionId",
			dataSource: objSection,
			animation: { close: { effects: "fadeOut zoom:out",duration: 300 },open: { effects: "fadeIn zoom:in",duration: 300 } }
		});

	},

	GetTaskType: function(identity,placeHolder) {
		var objTaskType=new Object();

		objTaskType=empressCommonManager.GetTaskTypeInformation();

		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "Task_Type_Name",
			dataValueField: "Task_Type_Id",
			dataSource: objTaskType
		});

	},

	GetLeaveAccumulationType: function(identity,placeHolder) {
		var obj=new Object();

		obj=empressCommonManager.GetLeaveAccumulationType();

		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "ACCUMULATIONTYPENAME",
			dataValueField: "ACCUMULATIONTYPEID",
			dataSource: obj
		});

	},

	GetLeaveTypeByAccumulationType: function(identity,placeHolder,accumulationType,hrRecordId) {
		var obj=new Object();

		obj=empressCommonManager.GetLeaveTypeByAccumulationType(accumulationType,hrRecordId);

		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "LeaveTypeName",
			dataValueField: "LeaveTypeId",
			dataSource: obj
		});

	},

	GetActiveLeaveType: function(identity,placeHolder) {
		var obj=new Object();

		obj=empressCommonManager.GetActiveLeaveType();

		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "TYPENAME",
			dataValueField: "LeaveTypeId",
			dataSource: obj
		});

	},

	PopulatePlanedLeaveTypeCombo: function(identity,placeHolder,hrRecordId,fiscalYearId) {
		var obj=new Object();

		obj=empressCommonManager.GetPlanedLeaveType(hrRecordId,fiscalYearId);

		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "TypeName",
			dataValueField: "LeaveType",
			dataSource: obj,
			index: 0
		});

	},

	GenerateEmployeeByCompanyId: function(companyId,branchId,departmentId,identity) {
		var objEmp=new Object();
		if(departmentId==0) {
			objEmp=null;
		}
		else {
			objEmp=empressCommonManager.GetEmployeeByCompanyIdAndBranchIdAndDepartmentId(companyId,branchId,departmentId);
		}
		$("#"+identity).kendoComboBox({
			placeholder: "All",
			dataTextField: "FullName",
			dataValueField: "HRRecordId",
			dataSource: objEmp
		});
	},

	GenerateEmployeeByDepartmentId: function(departmentId,identity) {
		var objEmp=new Object();
		if(departmentId==0) {
			objEmp=[];
		}
		else {
			objEmp=empressCommonManager.GetEmployeeByDepartmentId(departmentId);

		}



		$("#"+identity).kendoComboBox({
			placeholder: "All",
			dataTextField: "FullName",
			dataValueField: "HRRecordId",
			dataSource: objEmp
		});
	},

	GenerateEmployeeMultySelectByCompanyId: function(companyId,branchId,departmentId,identity) {
		var objEmp=new Object();
		if(departmentId==0) {
			objEmp=null;
		}
		else {
			objEmp=empressCommonManager.GetEmployeeByCompanyIdAndBranchIdAndDepartmentId(companyId,branchId,departmentId);
		}
		$("#"+identity).kendoComboBox({
			placeholder: "All",
			dataTextField: "FullName",
			dataValueField: "HRRecordId",
			dataSource: objEmp
		});


	},

	EmployeeTypeCombo: function(identity) {
		var objEmployeeType=new Object();
		objEmployeeType=empressCommonManager.GetEmployeeType();
		$("#"+identity).kendoComboBox({
			placeholder: "All",
			dataTextField: "EmployeeTypeName",
			dataValueField: "EmployeeTypeId",
			dataSource: objEmployeeType
		});
	},

	GetRegularEmployeeTypes: function(identity) {
		var objEmployeeType=new Object();
		objEmployeeType=empressCommonManager.GetRegularEmployeeTypes();
		$("#"+identity).kendoComboBox({
			placeholder: "All",
			dataTextField: "EmployeeTypeName",
			dataValueField: "EmployeeTypeId",
			dataSource: objEmployeeType
		});
	},

	NonRegularEmployeeTypeCombo: function(identity) {
		var objEmployeeType=new Object();
		objEmployeeType=empressCommonManager.GetNonRegularEmployeeType();
		$("#"+identity).kendoComboBox({
			placeholder: "Select Employee Type",
			dataTextField: "EmployeeTypeName",
			dataValueField: "EmployeeTypeId",
			dataSource: objEmployeeType
		});
	},

	GetSalaryStatus: function(identity,placeHolder) {
		var objStatus=new Object();
		objStatus=empressCommonManager.GetSalaryStatus();
		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "StateName",
			dataValueField: "WFStateId",
			dataSource: objStatus
		});
	},

	GetSalaryStatusByAdmin: function(identity,placeHolder) {
		var objStatus=new Object();
		objStatus=empressCommonManager.GetSalaryStatusForAdmin();
		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "StateName",
			dataValueField: "WFStateId",
			dataSource: objStatus
		});
	},

	GetOtherPaymentStatus: function(identity,placeHolder) {
		var objStatus=new Object();
		objStatus=empressCommonManager.GetOtherPaymentStatus();
		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "StateName",
			dataValueField: "WFStateId",
			dataSource: objStatus
		});
	},

	GetGratuityStatus: function(identity,placeHolder) {
		var objStatus=new Object();
		objStatus=empressCommonManager.GetGratuityStatus();
		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "StateName",
			dataValueField: "WFStateId",
			dataSource: objStatus
		});
	},

	GetPayrollStatus: function(identity,placeHolder) {
		var objStatus=new Object();
		objStatus=empressCommonManager.GetPayrollStatus();
		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "StateName",
			dataValueField: "WFStateId",
			dataSource: objStatus
		});
	},

	GetBonusStatus: function(identity,placeHolder) {
		var objStatus=new Object();
		objStatus=empressCommonManager.GetBonusStatus();
		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "StateName",
			dataValueField: "WFStateId",
			dataSource: objStatus
		});
	},

	GetCoffStatus: function(identity,placeHolder) {
		var objStatus=new Object();
		objStatus=empressCommonManager.GetCoffStatus();
		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "StateName",
			dataValueField: "WFStateId",
			dataSource: objStatus
		});
	},

	GetLeaveForwadingStatus: function(identity,placeHolder) {
		var objStatus=new Object();
		objStatus=empressCommonManager.GetLeaveForwadingStatus();
		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "StateName",
			dataValueField: "WFStateId",
			dataSource: objStatus
		});
	},

	GetProjectStatus: function(identity,placeHolder) {
		var objStatus=new Object();
		objStatus=empressCommonManager.GetProjectStatus();
		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "StateName",
			dataValueField: "WFStateId",
			dataSource: objStatus
		});
	},

	GetKraStatus: function(identity,placeHolder) {
		var objStatus=new Object();
		objStatus=empressCommonManager.GetKraStatus();
		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "StateName",
			dataValueField: "WFStateId",
			dataSource: objStatus
		});
	},

	populateClientCombo: function(companyId,identity) {
		var objClient=new Object();

		objClient=empressCommonManager.GetClient(companyId);
		$("#"+identity).kendoComboBox({
			placeholder: "Select Purpose...",
			dataTextField: "ClientName",
			dataValueField: "ClientCode",
			dataSource: objClient
		});

	},

	checkApproverUser: function(accessArray) {
		var approver=false;
		for(var i=0;i<accessArray.length;i++) {
			if(accessArray[i].ReferenceID==4) {
				approver=true;
				break;
			}
		}
		return approver;
	},

	checkIsPossibleClosedStatus: function(statusArray,stateId) {
		var isPosibleClosed=false;
		for(var i=0;i<statusArray.length;i++) {
			if(statusArray[i].WFStateId==stateId) {
				if(statusArray[i].IsClosed==1) {
					isPosibleClosed=true;
				}
				break;
			}
		}
		return isPosibleClosed;
	},

	checkIsClosedStatus: function(statusArray,stateId) {
		var isClosed=false;
		for(var i=0;i<statusArray.length;i++) {
			if(statusArray[i].WFStateId==stateId) {
				if(statusArray[i].IsClosed==2) {
					isClosed=true;
				}
				break;
			}
		}
		return isClosed;
	},

	GenerateDesignationCombo: function(companyId,identity) {
		var objDesignation=new Object();
		if(companyId!=0) {
			objDesignation=empressCommonManager.GenerateDesignationCombo(companyId);
		}
		else {
			objDesignation=null;
		}

		$("#"+identity).kendoComboBox({
			placeholder: "Select Designation",
			dataTextField: "DesignationName",
			dataValueField: "DesignationId",
			dataSource: objDesignation,
			animation: { close: { effects: "fadeOut zoom:out",duration: 300 },open: { effects: "fadeIn zoom:in",duration: 300 } }
		});
	},

	GenerateDesignationByDepartmentIdCombo: function(departmentId,identity) {
		var objDesignation=new Object();
		if(departmentId!=0) {
			objDesignation=empressCommonManager.GenerateDesignationByDepartmentIdCombo(departmentId);
		}
		else {
			objDesignation=null;
		}

		$("#"+identity).kendoComboBox({
			placeholder: "Select Designation",
			dataTextField: "DesignationName",
			dataValueField: "DesignationId",
			dataSource: objDesignation,
			animation: { close: { effects: "fadeOut zoom:out",duration: 300 },open: { effects: "fadeIn zoom:in",duration: 300 } }
		});
	},

	GenerateDesignationByCompanyIdCombo: function(companyId,identity) {
		var objDesignation=new Object();
		if(companyId!=0) {
			objDesignation=empressCommonManager.GenerateDesignationByCompanyIdComboData(companyId);
		}
		else {
			objDesignation=null;
		}

		$("#"+identity).kendoComboBox({
			placeholder: "Select Designation",
			dataTextField: "DesignationName",
			dataValueField: "DesignationId",
			dataSource: objDesignation,
			animation: { close: { effects: "fadeOut zoom:out",duration: 300 },open: { effects: "fadeIn zoom:in",duration: 300 } }
		});
	},



	GenerateDesignationAllCombo: function(identity) {
		var objDesignation=new Object();
		objDesignation=empressCommonManager.GenerateDesignationAllCombo();

		$("#"+identity).kendoComboBox({
			placeholder: "Select Designation",
			dataTextField: "DesignationName",
			dataValueField: "DesignationId",
			filter: "contains",
			suggest: true,
			dataSource: objDesignation,
			animation: { close: { effects: "fadeOut zoom:out",duration: 300 },open: { effects: "fadeIn zoom:in",duration: 300 } }
		});
	},

	GenerateGradeComboByCompanyAndType: function(companyId,payrollTypeId,identity) {

		var objGrade=null;
		if(companyId!=0) {
			objGrade=empressCommonManager.GetGradeByCompanyAndPayroll(companyId,payrollTypeId);
		}

		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "GradeName",
			dataValueField: "GradeSettingsId",
			dataSource: objGrade,
			//change: PayrollHelper.onChangeGradeType
		});

		$("#"+identity).parent().css('width',"20.6em");
	},

	GenerateGradeComboByCompanyId: function(companyId,identity) {

		var objGrade=null;
		if(companyId!=0) {
			objGrade=empressCommonManager.GenerateGradeComboByCompanyId(companyId);
		}

		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "GradeName",
			dataValueField: "GradeId",
			dataSource: objGrade,
			//change: PayrollHelper.onChangeGradeType
		});

		$("#"+identity).parent().css('width',"17.4em");
	},

	GenerateAllActiveGradeCombo: function(identity) {

		var objGrade=null;
		objGrade=empressCommonManager.GetAllActiveGradeCombo();

		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "GradeName",
			dataValueField: "GradeId",
			dataSource: objGrade,
		});

		$("#"+identity).parent().css('width',"17.4em");
	},

	GenerateCertificateTypeCombo: function(identity) {
		var objCertificateType=new Object();
		objCertificateType=empressCommonManager.GetCertificateType();

		$("#"+identity).kendoComboBox({
			placeholder: "Select Certificate Type",
			dataTextField: "CertificateTypeName",
			dataValueField: "CertificateTypeId",
			dataSource: objCertificateType
		});
	},

	populateMonthCombo: function(identity) {
		$("#"+identity).kendoComboBox({
			dataTextField: "text",
			dataValueField: "value",
			dataSource: [
            { text: "January",value: "1" },
            { text: "February",value: "2" },
            { text: "March",value: "3" },
            { text: "April",value: "4" },
            { text: "May",value: "5" },
            { text: "June",value: "6" },
            { text: "July",value: "7" },
            { text: "August",value: "8" },
            { text: "September",value: "9" },
            { text: "October",value: "10" },
            { text: "November",value: "11" },
            { text: "December",value: "12" }
			],
			filter: "contains",
			suggest: true
		});
		var month=new Date().getMonth()+1;
		var monthCombo=$("#"+identity).data("kendoComboBox");
		monthCombo.value(month);
	},

	GenerateYearCombo: function(identity) {
		$("#"+identity).kendoComboBox({
			dataTextField: "text",
			dataValueField: "value",
			dataSource: [
                { text: "2010",value: "2010" },
                { text: "2011",value: "2011" },
                { text: "2012",value: "2012" },
                { text: "2013",value: "2013" },
                { text: "2014",value: "2014" },
                { text: "2015",value: "2015" },
                { text: "2016",value: "2016" },
                { text: "2017",value: "2017" },
                { text: "2018",value: "2018" },
                { text: "2019",value: "2019" },
                { text: "2020",value: "2020" }
			],
			filter: "contains",
			suggest: true
		});

		var year=new Date().getFullYear();
		var yearCombo=$("#"+identity).data("kendoComboBox");
		yearCombo.value(year);
	},

	populateMovementTypeCombo: function(identity) {
		$("#"+identity).kendoComboBox({
			placeholder: "Select Movement Type",
			dataTextField: "text",
			dataValueField: "value",
			dataSource: [
                { text: "On Prayer",value: "1" },
                { text: "At Lunch",value: "2" },
                { text: "On Client Visit",value: "3" },
                { text: "Short Leave",value: "5" }
			],
			filter: "contains",
			suggest: true
		});
	},

	populateEncashmentTypeCombo: function(identity) {
		$("#"+identity).kendoComboBox({
			dataTextField: "text",
			dataValueField: "value",
			dataSource: [
                { text: "None",value: "0" },
                { text: "Full",value: "1" },
                { text: "Half",value: "2" }
			],
			filter: "contains",
			suggest: true,
			index: 0
		});
	},

	populateValuTypeCombo: function(identity) {

		$("#"+identity).kendoComboBox({
			placeholder: "Select Value Type",
			dataTextField: "text",
			dataValueField: "value",
			dataSource: [
                { text: "Fixed",value: "0" },
                { text: "Percentage",value: "1" }
			],
			filter: "contains",
			suggest: true
		});

	},

	populateCtcCombo: function(identity,placeholderText) {


		var obj=new Object();
		obj=empressCommonManager.GetCtcInformation();
		$("#"+identity).kendoComboBox({
			placeholder: placeholderText,
			dataTextField: "CtcName",
			dataValueField: "CtcId",
			dataSource: obj,
			filter: "contains",
			suggest: true
		});

	},

	populateCtcComboByOperator: function(identity,placeholderText,opType) {


		var obj=new Object();
		obj=empressCommonManager.GetCtcInformationByOperator(opType);
		$("#"+identity).kendoComboBox({
			placeholder: placeholderText,
			dataTextField: "CtcName",
			dataValueField: "CtcId",
			dataSource: obj,
			filter: "contains",
			suggest: true
		});

	},

	populateCtcTypeCombo: function(identity,placeholderText) {


		var obj=new Object();
		obj=empressCommonManager.GetCtcTypes();
		$("#"+identity).kendoComboBox({
			placeholder: placeholderText,
			dataTextField: "CtcTypeName",
			dataValueField: "CtcTypeId",
			dataSource: obj,
			filter: "contains",
			suggest: true
		});

	},

	populateCtcOperatorCombo: function(identity) {

		$("#"+identity).kendoComboBox({
			placeholder: "Select Value Type",
			dataTextField: "text",
			dataValueField: "value",
			dataSource: [
                { text: "Adition",value: "1" },
                { text: "Deduction",value: "2" }
			],
			filter: "contains",
			suggest: true
		});

	},

	populateLoanType: function(identity,placeholderText) {


		var obj=new Object();
		obj=empressCommonManager.GetLoanTypes();
		$("#"+identity).kendoComboBox({
			placeholder: placeholderText,
			dataTextField: "LoanTypeName",
			dataValueField: "LoanTypeId",
			dataSource: obj,
			filter: "contains",
			suggest: true
		});

	},

	populateEmiType: function(identity) {

		$("#"+identity).kendoComboBox({
			// placeholder: "Select Emi Type",
			dataTextField: "text",
			dataValueField: "value",
			dataSource: [
                { text: "Monthly",value: "1" },
                { text: "Quaterly",value: "2" },
                { text: "HalfYearly",value: "3" },
                { text: "Yearly",value: "4" },
                { text: "3 Years",value: "5" },
                { text: "5 Years",value: "6" }
			],
			index: 0,
			filter: "contains",
			suggest: true
		});

	},

	populateRepostingType: function(identity,placeholderText) {

		var obj=new Object();
		obj=empressCommonManager.populateRepostingType();
		$("#"+identity).kendoComboBox({
			placeholder: placeholderText,
			dataTextField: "PostingTypeName",
			dataValueField: "PostingTypeId",
			dataSource: obj,
			filter: "contains",
			suggest: true
		});

	},

	GenerateFunctionCombo: function(identity,placeholderText) {
		var objFunction=new Object();

		objFunction=empressCommonManager.GenerateFunctionCombo();
		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "Function_Name",
			dataValueField: "Func_Id",
			dataSource: objFunction
		});

	},

	GenerateRsmRegionCombo: function(identity,placeholderText,regionManager) {


		var objFunction=new Object();
		objFunction=empressCommonManager.GetAllActiveRsmRegionComboDataForFieldForceAttendance();
		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "RSMRegionName",
			dataValueField: "RSMRegionCode",
			dataSource: objFunction,
			change: onChange,
			//  enable: ((regionManager != 0) ? false : true),
		});
		if(regionManager!=0) {
			$("#"+identity).data("kendoComboBox").value(regionManager);
			var rsmCode=$("#"+identity).data("kendoComboBox").value();
			if(rsmCode!='') {
				var PSOLocationSataSource=empressCommonManager.GeneratePSOLocationCombo(rsmCode);
				$("#"+PSOIdentity).kendoComboBox({
					placeholder: placeholderText,
					dataTextField: "PSOLocationName",
					dataValueField: "PSOLocationCode",
					dataSource: PSOLocationSataSource,
				});
			}
		}
		function onChange() {
			var rsmCode=this.element.data("kendoComboBox").value();
			$("#"+PSOIdentity).data("kendoComboBox").value('');
			if(rsmCode!='') {
				var PSOLocationSataSource=empressCommonManager.GeneratePSOLocationCombo(rsmCode);
				$("#"+PSOIdentity).kendoComboBox({
					placeholder: placeholderText,
					dataTextField: "PSOLocationName",
					dataValueField: "PSOLocationCode",
					dataSource: PSOLocationSataSource,
				});

			}
		};
	},

	GeneratePSOLocationCombo: function(identity,placeholderText,rsmCode) {
		var objFunction=new Object();
		PSOIdentity=identity;
		objFunction=empressCommonManager.GeneratePSOLocationCombo(rsmCode);
		$("#"+identity).kendoComboBox({
			placeholder: placeholderText,
			dataTextField: "PSOLocationName",
			dataValueField: "PSOLocationCode",
			dataSource: objFunction,
		});
	},

	GenerateShiftComboByCompanyAndBranch: function(companyId,branchId,identity,placeHolderText) {
		var objShift=[];
		if(companyId!=0) {
			objShift=empressCommonManager.GenerateShiftComboByCompanyAndBranch(companyId,branchId);
		}
		else {
			objShift=[];
		}

		//var obj = new Object();
		//obj.ShiftName = "Default";
		//obj.ShiftId = 0;
		//objShift.insert(0,obj);



		$("#"+identity).kendoComboBox({
			placeholder: placeHolderText,
			dataTextField: "ShiftName",
			dataValueField: "ShiftId",
			dataSource: objShift,
			indext: 0
		});
	},

	populateCtcCategoryCombo: function(identity,placeHolder) {
		var obj=new Object();

		obj=empressCommonManager.GetCtcCategoryInformation();
		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "CtcCategoryName",
			dataValueField: "CtcCategoryId",
			dataSource: obj
		});

	},

	populateGradeTypeCombo: function(identity) {
		var obj=new Object();
		obj=empressCommonManager.GetGradeType();
		$("#"+identity).kendoComboBox({
			placeholder: "Please Select",
			dataTextField: "GradeTypeName",
			dataValueField: "GradeTypeId",
			dataSource: obj
		});
	},

	populateTrainingTypeCombo: function(identity) {
		var obj=new Object();
		obj=empressCommonManager.GetTrainingType();
		$("#"+identity).kendoComboBox({
			placeholder: "Training Type",
			dataTextField: "TrainingTypeName",
			dataValueField: "TrainingTypeId",
			dataSource: obj
		});
	},

	populateTrainingCategoryCombo: function(identity) {
		var obj=new Object();
		obj=empressCommonManager.GetTrainingCategory();
		$("#"+identity).kendoComboBox({
			placeholder: "Training Category",
			dataTextField: "TrainingCategoryName",
			dataValueField: "TrainingCategoryId",
			dataSource: obj
		});
	},

	populateSurveyQuestionCategoryCombo: function(identity) {
		var obj=new Object();
		obj=empressCommonManager.GetDataForAnyCombo("../SurveyQuestion/GetSurveyQuestionDataForCombo/?surveyCategoryid=0");//Here 0 means all
		$("#"+identity).kendoComboBox({
			placeholder: "Please Select a Survey Question",
			dataTextField: "QuestionCategoryDescription",
			dataValueField: "QuestionCategoryId",
			dataSource: obj
			//index: 0
		});
	},
	populateSurveyQuestionCategoryCombo: function(identity) {
		var obj=new Object();
		obj=empressCommonManager.GetDataForAnyCombo("../SurveyQuestion/GetSurveyQuestionDataForCombo/?surveyCategoryid=0");//Here 0 means all
		$("#"+identity).kendoComboBox({
			placeholder: "Please Select a Survey Question",
			dataTextField: "QuestionCategoryDescription",
			dataValueField: "QuestionCategoryId",
			dataSource: obj
			//index: 0
		});
	},

	populateSurveyQuestionCategoryComboBySurveyCategory: function(identity,surveyCategoryId) {
		var obj=new Object();
		obj=empressCommonManager.GetDataForAnyCombo("../SurveyQuestion/GetSurveyQuestionDataForComboBySurveyCategoryId/?surveyCategoryid="+surveyCategoryId);//Here 0 means all
		$("#"+identity).kendoComboBox({
			placeholder: "Please Select a Survey Question",
			dataTextField: "QuestionCategoryDescription",
			dataValueField: "QuestionCategoryId",
			dataSource: obj
			//index: 0
		});
	},

	populateSurveyCategoryCombo: function(identity) {
		var obj=new Object();

		obj=empressCommonManager.GetDataForAnyCombo("../PublishSurvey/GetSurveyCategoryDataForCombo");

		$("#"+identity).kendoComboBox({
			placeholder: "Please Select a Survey Category",
			dataTextField: "SurveyCategoryDescription",
			dataValueField: "SurveyCategoryId",
			dataSource: obj
			//index: 0
		});
	},

	commonValidator: function(ctlId) {
		var data=[];
		var validator=$("#"+ctlId).kendoValidator().data("kendoValidator"),
            status=$(".status");
		if(validator.validate()) {
			status.text("").addClass("valid");
			return true;
		} else {
			status.text("Oops! There is invalid data in the form.").addClass("invalid");
			return false;
		}

	},

	populateFiscalCombo: function(identity,placeHolder,companyId) {
		var objFiscalYear=new Object();
		objFiscalYear=empressCommonManager.GetFiscalYear(companyId);
		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "FiscalYearName",
			dataValueField: "FiscalYearId",
			dataSource: objFiscalYear,
			index: 0
		});
	},

	populateTaxYearCombo: function(identity,placeHolder) {
		var objTaxYear=new Object();
		objTaxYear=empressCommonManager.GetTaxYearCombo();
		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "TaxYearName",
			dataValueField: "TaxYearId",
			dataSource: objTaxYear,
		});
	},

	populateLeaveTypeCombo: function(identity,placeholderText,companyId,hrRecordId) {
		var obj=new Object();

		obj=empressCommonManager.GetLeaveTypeByCompanyIdAndhrRecordId(companyId,hrRecordId);
		$("#"+identity).kendoComboBox({
			placeholder: placeholderText,
			dataTextField: "TypeName",
			dataValueField: "LeaveType",
			dataSource: obj
		});
	},

	populateLeaveTypeComboByHrRecordId: function(identity,placeholderText,hrRecordId) {
		var obj=new Object();

		obj=empressCommonManager.GetLeaveTypeByhrRecordId(hrRecordId);
		$("#"+identity).kendoComboBox({
			placeholder: placeholderText,
			dataTextField: "TypeName",
			dataValueField: "LeaveType",
			dataSource: obj
		});
	},

	populateCountryCombo: function(identity) {
		var objCountry=new Object();
		objCountry=empressCommonManager.GetCountryComboData();

		$("#"+identity).kendoComboBox({
			placeholder: "All",
			dataTextField: "CountryName",
			dataValueField: "CountryId",
			dataSource: objCountry
		});
	},

	populateDistrictCombo: function(identity) {
		var objDistrict=new Object();
		objDistrict=empressCommonManager.GetDistrictComboData();
		$("#"+identity).kendoComboBox({
			placeholder: "Select District",
			dataTextField: "DistrictName",
			dataValueField: "DistrictId",
			dataSource: objDistrict
		});

	},

	populateThanaCombo: function(identity) {
		var objThana=new Object();
		objThana=empressCommonManager.GetThanaComboData();
		$("#"+identity).kendoComboBox({
			placeholder: "All",
			dataTextField: "ThanaName",
			dataValueField: "ThanaId",
			dataSource: objThana
		});

	},

	populateThanaComboByDistrictId: function(districtId,identity) {
		var objThana=new Object();
		objThana=empressCommonManager.GetThanaComboDatabyDistrictId(districtId);
		$("#"+identity).kendoComboBox({
			placeholder: "All",
			dataTextField: "ThanaName",
			dataValueField: "ThanaId",
			dataSource: objThana
		});

	},

	populateThanaComboByDistrictIdInBangla: function(districtId,identity) {
		var objThana=new Object();
		objThana=empressCommonManager.GetThanaComboDatabyDistrictId(districtId);
		$("#"+identity).kendoComboBox({
			placeholder: "All",
			dataTextField: "ThanaName_bn",
			dataValueField: "ThanaId",
			dataSource: objThana
		});

	},

	populateKraYearConfigData: function(identity,placeHolderText) {
		var obj=new Object();
		obj=empressCommonManager.GetKraYearConfigData();
		$("#"+identity).kendoComboBox({
			placeholder: placeHolderText,
			dataTextField: "ConfigName",
			dataValueField: "YearConfigId",
			dataSource: obj,
			index: 0,
		});

	},

	GenerateBankCombo: function(identity) {
		var objBank=new Object();
		objBank=empressCommonManager.GetAllBank();
		$("#"+identity).kendoComboBox({
			placeholder: "Select Bank",
			dataTextField: "BankName",
			dataValueField: "BankId",
			dataSource: objBank
		});
	},

	GenerateBankComboForSalary: function(identity) {
		var objBank=new Object();
		objBank=empressCommonManager.GetAllBankForSalary();

		var obj=new Object();
		obj.BankId="-1";
		obj.BankName="Cash";

		// objBank.push(obj);

		$("#"+identity).kendoComboBox({
			placeholder: "Select Bank",
			dataTextField: "BankName",
			dataValueField: "BankId",
			dataSource: objBank
		});

		$("#"+identity).data("kendoComboBox").dataSource.insert(0,obj);

		obj=new Object();
		obj.BankId="-2";
		obj.BankName="All";
		$("#"+identity).data("kendoComboBox").dataSource.insert(0,obj);
		if(assembly.AssemblyInfoId==16) {
			obj=new Object();
			obj.BankId="-3";
			obj.BankName="Others";
			$("#"+identity).data("kendoComboBox").dataSource.insert(0,obj);
		}


		$("#"+identity).data("kendoComboBox").value(-2);
	},

	GenerateBankBranchCombo: function(identity) {
		var objBank=new Object();
		//objBank = empressCommonManager.GetAllBank();
		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "BranchName",
			dataValueField: "BranchId",
			dataSource: [],
			suggest: true,
		});
	},

	GenerateAccountComboByBranchId: function(identity,branchId) {
		var obj=new Object();
		obj=empressCommonManager.GetAccountByBranchId(branchId);
		$("#"+identity).kendoComboBox({
			placeholder: "Select Account No",
			dataTextField: "AccountNo",
			dataValueField: "AccountNo",
			dataSource: obj,
			index: 0
		});
	},

	GenerateAccountComboByBranchIdAndCompanyArrayForSalary: function(identity,branchId,companyArray,branchArray) {
		var obj=new Object();
		obj=empressCommonManager.GenerateAccountComboByBranchIdAndCompanyArrayForSalary(branchId,companyArray,branchArray);
		$("#"+identity).kendoComboBox({
			placeholder: "Select Account No",
			dataTextField: "AccountNo",
			dataValueField: "AccountNo",
			dataSource: obj,
			//index: 0
		});
	},

	PopulateAllAccountHeadCombo: function(identity,placeholderText) {
		var obj=new Object();
		obj=empressCommonManager.GetAllAccountHead();
		$("#"+identity).kendoComboBox({
			placeholder: placeholderText,
			dataTextField: "AccountHeadName",
			dataValueField: "AccountHeadId",
			template: '${ data.AccountHeadCode }-${ data.AccountHeadName }',
			dataSource: obj
		});
	},

	PopulateRootAccountHeadCombo: function(identity,placeholderText,isManualHead) {
		var obj=new Object();
		obj=empressCommonManager.GetRootAccountHead(isManualHead);
		$("#"+identity).kendoComboBox({
			placeholder: placeholderText,
			dataTextField: "AccountHeadName",
			dataValueField: "AccountHeadId",
			template: '${ data.AccountHeadCode }-${ data.AccountHeadName }',
			dataSource: obj
		});
	},

	PopulateAllAccountHeadComboAndShowAccountHeadCode: function(identity,placeholderText) {
		var obj=new Object();
		obj=empressCommonManager.GetAllAccountHead();
		$("#"+identity).kendoComboBox({
			placeholder: placeholderText,
			dataTextField: "AccountHeadCode",
			dataValueField: "AccountHeadId",
			template: '${ data.AccountHeadCode }-${ data.AccountHeadName }',
			dataSource: obj
		});
	},

	PopulateNoticeCategoryCombo: function(identity,placeholderText) {
		var obj=new Object();
		obj=empressCommonManager.GetDataForAnyCombo("../NoticeCategory/GetNoticeCategoryDataForCombo");
		$("#"+identity).kendoComboBox({
			placeholder: "Please Select a Notice Category",
			dataTextField: "NoticeCategoryDescription",
			dataValueField: "NoticeCategoryId",
			dataSource: obj
			//index: 0
		});
	},

	PopulateNewsCategoryCombo: function(identity,placeholderText) {
		var obj=new Object();
		obj=empressCommonManager.GetDataForAnyCombo("../NewsCategory/GetNewsCategoryDataForCombo");
		$("#"+identity).kendoComboBox({
			placeholder: "Please Select a News Category",
			dataTextField: "NewsCategoryDescription",
			dataValueField: "NewsCategoryId",
			dataSource: obj
			//index: 0
		});
	},

	populateReligionCombo: function(identity) {
		var objReligion=new Object();
		objReligion=empressCommonManager.GetReligionComboData();
		$("#"+identity).kendoComboBox({
			placeholder: "Select Religion",
			dataTextField: "ReligionName",
			dataValueField: "ReligionId",
			dataSource: objReligion,
			change: function() {
				var value=this.value();
				AjaxManager.isValidItem(identity,true);
			}
		});

	},

	populatePayband: function(identity,textPlaceHolder) {
		var obj=new Object();
		obj=empressCommonManager.GetPaybandComboData();
		$("#"+identity).kendoComboBox({
			placeholder: textPlaceHolder,
			dataTextField: "PaybandName",
			dataValueField: "PaybandId",
			dataSource: obj
		});

	},

	populateCtcByCategory: function(identity,textPlaceHolder,category) {
		var obj=new Object();
		obj=empressCommonManager.GetCtcTypesByCategory(category);

		$("#"+identity).kendoComboBox({
			placeholder: textPlaceHolder,
			dataTextField: "CtcName",
			dataValueField: "CtcId",
			dataSource: obj
		});

	},

	populateCtcByCategoryForDailyAllowance: function(identity,textPlaceHolder,category) {
		var obj=new Object();
		obj=empressCommonManager.GetCtcTypesByCategoryForDailyAllowance(category);

		$("#"+identity).kendoComboBox({
			placeholder: textPlaceHolder,
			dataTextField: "CtcName",
			dataValueField: "CtcId",
			dataSource: obj
		});

	},

	populateCtcByCategoryForFieldBenefitDailyAllowance: function(identity,textPlaceHolder,category) {
		var obj=new Object();
		obj=empressCommonManager.GetCtcByCategoryForFieldBenefitDailyAllowance(category);

		$("#"+identity).kendoComboBox({
			placeholder: textPlaceHolder,
			dataTextField: "CtcName",
			dataValueField: "CtcId",
			dataSource: obj
		});

	},

	clearCommonFields: function(divId) {

		$("input[type='text']").val("");
		$("input[type='hidden']").val(0);
		$('textarea').val('');
		$(".k-datepicker input").val('');
		$(".k-input input").val('');
		$("input[type='email']").val("");
		var status=$(".status");
		status.text("").removeClass("invalid");
		$("#"+divId+" > form").kendoValidator();//Div id
		$("#"+divId).find("span.k-tooltip-validation").hide();
	},

	PopulateEmployeeContributionAccountHeadHeadBySubject: function(identity,textPlaceHolder) {

		$("#"+identity).kendoComboBox({
			placeholder: textPlaceHolder,
			dataTextField: "AccountHeadName",
			dataValueField: "AccountHeadId",
			template: '${ data.AccountHeadCode }-${ data.AccountHeadName }',
			dataSource: []
		});
	},

	PopulateCompanyContributionAccountHeadHeadBySubject: function(identity,textPlaceHolder) {

		$("#"+identity).kendoComboBox({
			placeholder: textPlaceHolder,
			dataTextField: "AccountHeadName",
			dataValueField: "AccountHeadId",
			template: '${ data.AccountHeadCode }-${ data.AccountHeadName }',
			dataSource: []
		});
	},

	PopulateVoucherType: function(identity,textPlaceHolder) {

		$("#"+identity).kendoComboBox({
			placeholder: textPlaceHolder,
			dataTextField: "VoucharTypeName",
			dataValueField: "VoucharTypeId",
			dataSource: empressCommonManager.GetVoucherType()
		});
	},

	PopulateTransectionType: function(identity,textPlaceHolder) {

		$("#"+identity).kendoComboBox({
			placeholder: textPlaceHolder,
			dataTextField: "TransectionTypeName",
			dataValueField: "TransectionTypeId",
			dataSource: []
		});
	},

	populateSubjectOfAccounts: function(identity,textPlaceHolder) {
		var obj=new Object();
		obj=empressCommonManager.GetSubjectOfAccounts();

		$("#"+identity).kendoComboBox({
			placeholder: textPlaceHolder,
			dataTextField: "SubjectOfAccountName",
			dataValueField: "SubjectOfAccountId",
			dataSource: obj,
			index: 0
		});

	},

	PopulateJobVacancy: function(identity) {
		$("#"+identity).kendoComboBox({
			placeholder: "Select Position ",
			dataTextField: "JobTitle",
			dataValueField: "JobVacancyId",
			dataSource: []
		});
	},

	populateInvestmentTypeCombo: function(identity) {

		$("#"+identity).kendoDropDownList({
			dataTextField: "text",
			dataValueField: "value",
			dataSource: [
                { text: "Fixed Deposit",value: "0" },
                { text: "Shanchay Parta",value: "1" }
			],
			filter: "contains",
			suggest: true,
			index: 0
		});

	},

	populatePaybandTypeCombo: function(identity) {

		$("#"+identity).kendoDropDownList({
			dataTextField: "text",
			dataValueField: "value",
			dataSource: [
                { text: "Basic",value: "1" },
                { text: "Goal Seek",value: "2" },
                { text: "Gross",value: "3" }
			],
			filter: "contains",
			suggest: true,
			index: 0
		});

	},

	EmployeeSearchTextBox: function(ctrlId) {

		$("#"+ctrlId).kendoSearchTextBox({

		});
		$("#"+ctrlId).bind('keypress',function(e) {

			if(e.keyCode==13) {

				var that=$("#"+ctrlId).val();
				var data=empressCommonManager.GetEmployeeByIdAndShortName(that);
				if(data!=null) {
					$("#"+ctrlId).val(data.EmployeeName);
				} else {
					$("#"+ctrlId).val("");
				}

			}


		});


	},

	PopulateApplicantCombo: function(identity) {
		var obj=new Object();
		obj=empressCommonManager.GetDataForAnyCombo("../Applicant/GetApplicantDataForCombo");
		$("#"+identity).kendoComboBox({
			placeholder: "Please Select a Applicant",
			dataTextField: "ApplicantName",
			dataValueField: "ApplicantId",
			dataSource: obj
			//index: 0
		});
	},

	populateGradeType: function(identity) {

		$("#"+identity).kendoDropDownList({
			dataTextField: "text",
			dataValueField: "value",
			dataSource: [
                { text: "Management",value: "1" },
                { text: "Non Management",value: "2" },
                { text: "Contractual",value: "3" },
                { text: "BOD",value: "4" }
			],
			filter: "contains",
			suggest: true,
			index: 0
		});

	},

	PopulateGradeTypeCombo: function(identity) {
		var obj=new Object();
		obj=empressCommonManager.GetDataForAnyCombo("../GradeTypeSettings/PopulateGradeTypeCombo");
		$("#"+identity).kendoDropDownList({
			placeholder: "Please Select",
			dataTextField: "GradeTypeName",
			dataValueField: "GradeTypeInfoId",
			dataSource: obj
			//index: 0
		});
	},

	populateFinalSettlementStatus: function(identity) {
		var obj=new Object();
		var obj=empressCommonManager.GetDataForAnyCombo("../Status/GetDynamicStateInfoByMenuId");

		$("#"+identity).kendoDropDownList({
			dataTextField: "StateName",
			dataValueField: "WFStateId",
			dataSource: obj,
			filter: "contains",
			suggest: true
		});

	},


	populateDynamicStatusInfoByMenuId: function(identity) {
		var obj=new Object();
		var obj=empressCommonManager.GetDataForAnyCombo("../Status/GetDynamicStateInfoByMenuId");

		$("#"+identity).kendoDropDownList({
			dataTextField: "StateName",
			dataValueField: "WFStateId",
			dataSource: obj,
			filter: "contains",
			suggest: true
		});

	},

	PopulateCategoryCombo: function(identity) {
		var objCategory=new Object();
		objCategory=empressCommonManager.GetCategoryComboData();

		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "AssetCategoryName",
			dataValueField: "AssetCategoryId",
			dataSource: objCategory
		});
	},

	PopulateCommonCombo: function(identity,textField,valueField,placeholder,jsonParam,url) {
		$("#"+identity).kendoComboBox({
			dataTextField: textField,
			dataValueField: valueField,
			dataSource: empressCommonManager.GetCommonComboData(jsonParam,url),
			placeholder: placeholder
		});
	},

	PopulateCompetencyCombo: function(identity) {
		var objCompetency=new Object();
		objCompetency=empressCommonManager.GetCompetencyComboData();

		$("#"+identity).kendoComboBox({
			placeholder: "Select Competency",
			dataTextField: "CompetencyName",
			dataValueField: "CompetencyId",
			dataSource: objCompetency,
			filter: "contains",
			suggest: true,
			optionLabel: "Please Select...",
		});
	},

	PopulateCompetencyAreaSectionCombo: function(identity) {
		var objAreaSection=new Object();
		objAreaSection=empressCommonManager.GetCompetencyAreaSectionComboData();

		$("#"+identity).kendoComboBox({
			placeholder: "Select Area Section",
			dataTextField: "Comp_Area_Section_Name",
			dataValueField: "Id",
			dataSource: objAreaSection,
			filter: "contains",
			suggest: true,
		});
	},

	PopulateCompetencyLevelCombo: function(identity) {
		var objCompetencyLevel=new Object();
		objCompetencyLevel=empressCommonManager.GetCompetencyLevelComboData();

		$("#"+identity).kendoComboBox({
			placeholder: "Select Competency Level",
			dataTextField: "LevelTitle",
			dataValueField: "LevelId",
			dataSource: objCompetencyLevel,
			filter: "contains",
			suggest: true,
		});
	},

	PopulateCompetencyAreaCombo: function(identity) {
		var objCompetencyArea=new Object();
		objCompetencyArea=empressCommonManager.GetCompetencyAreaComboData();

		$("#"+identity).kendoComboBox({
			placeholder: "Select Competency Area",
			dataTextField: "CompitencyAreaName",
			dataValueField: "CompetencyAreaId",
			dataSource: objCompetencyArea,
			filter: "contains",
			suggest: true,
		});
	},

	initTopToPageScrooler: function() {
		$(window).scroll(function() {
			if($(this).scrollTop()>100) {
				$('.scrollup').fadeIn();
			} else {
				$('.scrollup').fadeOut();
			}
		});

		$('.scrollup').click(function() {
			$("html, body").animate({
				scrollTop: 0
			},600);
			return false;
		});
	},

	populateDropDownList: function(identity,textField,valueField,url,jsonParam) {
		if(jsonParam==undefined) {
			jsonParam="";
		}

		$("#"+identity).kendoDropDownList({
			optionLabel: "Select",
			dataTextField: textField,
			dataValueField: valueField,
			dataSource: empressCommonManager.GetCommonComboData(jsonParam,url),

		});

	},

	PopulateGroup: function(ctrlId) {
		var data=empressCommonManager.GetAllGroupData();
		$("#"+ctrlId).kendoComboBox({
			placeholder: "Select Group",
			dataTextField: "GroupName",
			dataValueField: "GroupId",
			dataSource: data,

		});

	},

	populateLeaveReason: function(ctrlId) {
		$("#"+ctrlId).kendoDropDownList({
			optionLabel: "Select",
			dataTextField: 'Reason',
			dataValueField: 'LeaveReasonId',
			dataSource: empressCommonManager.GetLeaveReason(),

		});
	},

	PopulateAccountHeadCombo: function(identity,placeholderText) {
		var obj=new Object();
		$("#"+identity).kendoComboBox({
			placeholder: placeholderText,
			filter: "startwith",
			dataTextField: "AccountHeadName",
			dataValueField: "AccountHeadId",
			template: '${ data.AccountHeadCode }-${ data.AccountHeadName }',
			dataSource: []
		});
	},

	checkApproverUser: function() {
		var approver=false;
		for(var i=0;i<accessArray.length;i++) {
			if(accessArray[i].ReferenceID==4) {
				approver=true;
				break;
			}
		}
		return approver;
	},

	checkRecomanderUser: function() {
		var recomander=false;

		for(var i=0;i<accessArray.length ;i++) {
			if(accessArray[i].ReferenceID==3) {
				recomander=true;
				break;
			}
		}
		return recomander;
	},

	checkOnlyApprovalData: function() {
		var onlyApprovalData=false;

		for(var i=0;i<accessArray.length ;i++) {
			if(accessArray[i].ReferenceID==29) {
				onlyApprovalData=true;
				break;
			}
		}
		return onlyApprovalData;
	},

	checkHrUser: function() {
		var hrUser=false;

		for(var i=0;i<accessArray.length ;i++) {
			if(accessArray[i].ReferenceID==22) {
				hrUser=true;
				break;
			}
		}
		return hrUser;
	},

	populateFundYearCombo: function(identity,placeHolder) {
		var objTaxYear=new Object();
		objTaxYear=empressCommonManager.GetFundYearCombo();
		$("#"+identity).kendoComboBox({
			placeholder: placeHolder,
			dataTextField: "TaxYearName",
			dataValueField: "TaxYearId",
			dataSource: objTaxYear,
			//index: 0
		});
		for(var i=0;i<objTaxYear.length;i++) {
			if(objTaxYear[i].IsCurrent) {
				$("#"+identity).data("kendoComboBox").value(objTaxYear[i].TaxYearId);
			}
		}
	},

	populateInvestmentType: function(identity,textPlaceHolder) {


		var obj=new Object();
		obj=empressCommonManager.GetInvestmentType();

		$("#"+identity).kendoDropDownList({
			placeholder: textPlaceHolder,

			dataTextField: "InvestmentTypeName",
			dataValueField: "InvestmentTypeId",
			dataSource: obj
		});
	},

	PfEligibleAmountCombo: function(identity,placeholderText) {
		var obj=new Object();
		obj=empressCommonManager.PfEligibleAmountCombo();
		$("#"+identity).kendoComboBox({
			placeholder: (placeholderText?placeholderText:'Please select'),
			dataTextField: "PfFundEligibleAmountName",
			dataValueField: "PfFundEligibleAmountId",
			dataSource: obj
		});
	},

	GetIsApprover: function(hrRecordId,moduleId) {
		var approver=empressCommonManager.GetApprover(hrRecordId,moduleId);
		if(approver==null) {
			return false;
		}
		if(approver.Type==1) {
			return true;
		} else {
			return false;

		}
	},

	GetIsRecommender: function(hrRecordId,moduleId) {
		var recommender=empressCommonManager.GetApprover(hrRecordId,moduleId);
		if(recommender==null) {
			return false;
		}
		if(recommender.Type==2) {
			return true;
		} else {
			return false;

		}
	},

	AzDatePicker: function(container) {
		$("#"+container).kendoDatePicker({
			start: "date",
			depth: "year",
			format: "MM/dd/yyyy",
			value: ""
		});
	},



	GetReportingLine: function(hrRecordId,applicationId) {
		var url='../ApproverRecommender/GetReportingLineDetailses';
		var param="hrRecordId="+hrRecordId+"&applicationId="+applicationId;
		var approverList=AjaxManager.GetJsonResults(url,param);

		return approverList;
	},

	ShowReportingLine: function(container,approvers) {

		if(approvers.length>0) {
			// //debugger;
			var htmls="";

			for(var i=0;i<approvers.length;i++) {
				var appDate=kendo.toString(kendo.parseDate(approvers[i].ApprovedDate),"dd-MM-yyyy")=='01-01-0001'?'':kendo.toString(kendo.parseDate(approvers[i].ApprovedDate),"dd MMM yyyy hh:mm:ss tt");

				htmls+="<b>"+approvers[i].TypeName+": "+approvers[i].SortOrder+"</b><br>";
				htmls+="<span> Employee ID:"+approvers[i].ApproverEmployeeId+"&nbsp; Name:"+approvers[i].ApproverName+"</span><br>";
				htmls+="<span> Designation:"+approvers[i].ApproverDesignation+"&nbsp; Company:"+approvers[i].ApproverCompany+"</span><br>";
			}
			$("#"+container).html(htmls);

		} else {
			$("#"+container).html("No Approver found for the Applicant");
		}
	},

	GetApproverRecommendar: function(hrRecordId,applicationId) {
		var url='../ApproverRecommender/GetApproverRecomendarDetailses';
		var param="hrRecordId="+hrRecordId+"&applicationId="+applicationId;
		var approverList=AjaxManager.GetJsonResults(url,param);

		return approverList;
	},

	ShowApproverRecommendar: function(container,approvers) {

		if(approvers.length>0) {
			// //debugger;
			var htmls="";

			for(var i=0;i<approvers.length;i++) {

				var appDate=empressCommonHelper.TemplateAppliedDateView(approvers[i].ApprovedDate);
				htmls+="<b>"+approvers[i].TypeName+": "+approvers[i].SortOrder+"</b><br>";
				htmls+="<span> Employee ID: "+approvers[i].ApproverEmployeeId+"&nbsp; Name: "+approvers[i].ApproverName+"</span><br>";
				htmls+="<span> Designation: "+approvers[i].ApproverDesignation+"&nbsp; Company: "+approvers[i].ApproverCompany+"</span><br>";
				htmls+="<input type='hidden' id='appro-"+approvers[i].ApproverId+"' value='"+approvers[i].ApproverId+"'>";
				htmls+="<label class='lbl widthSize30_per'>Approve/Decline:</label>&nbsp; <input type='checkBox' class='k-checkbox' id='chkAppro-"+approvers[i].ApproverId+"' disabled='disabled' ></br>";
				htmls+="<label class='lbl widthSize20_per'>Remarks:</label><textarea id='appro-comments-"+approvers[i].ApproverId+"' class='k-textbox'></textarea></br>";
				htmls+="<input type='hidden' id='assignApproId-"+approvers[i].ApproverId+"' value='"+approvers[i].AssignApproverId+"'>";
				htmls+="<label class='lbl widthSize20_per'>Date:</label><input class='k-textbox' id='approvedDate-"+approvers[i].ApproverId+"' value='"+appDate+"' disabled='disabled'></br></br>";
			}
			$("#"+container).html(htmls);
			for(i=0;i<approvers.length;i++) {
				if(approvers[i].IsOpen==false||CurrentUser.EmployeeId!=approvers[i].ApproverId) {
					$("#"+'appro-comments-'+approvers[i].ApproverId).val(approvers[i].Comments);
					$("#"+'appro-comments-'+approvers[i].ApproverId).attr("disabled","disabled");
					$("#"+'approvedDate-'+approvers[i].ApproverId).attr("disabled","disabled");
					$("#"+'chkAppro-'+approvers[i].ApproverId).prop("checked",!approvers[i].IsOpen);
					$("#"+'chkAppro-'+approvers[i].ApproverId).prop("disabled",true);
				}
			}

			$("#liAuthorizationPanel").show();

		} else {
			$("#"+container).html("No Approver found for the Applicant");
		}
	},

	GetReasonForReview: function(hrRecordId,applicationId) {
		var url='../ApproverRecommender/GetReasonForReview';
		var param="hrRecordId="+hrRecordId+"&applicationId="+applicationId;
		var approverList=AjaxManager.GetJsonResults(url,param);

		return approverList;
	},

	ShowReasonOfReview: function(container,approvers) {

		if(approvers.length>0) {
			// //debugger;
			var htmls="";

			for(var i=0;i<approvers.length;i++) {

				var appDate=empressCommonHelper.TemplateAppliedDateView(approvers[i].ApprovedDate);


				htmls+="<b>"+approvers[i].TypeName+" : "+approvers[i].SortOrder+"</b><br>";

				htmls+="<span> Employee ID : "+approvers[i].ApproverEmployeeId+"&nbsp; Name : "+approvers[i].ApproverName+"</span><br>";
				htmls+="<span> Designation : "+approvers[i].ApproverDesignation+"&nbsp; Company : "+approvers[i].ApproverCompany+"</span><br>";
				htmls+="<input type='hidden' id='appro-"+approvers[i].ApproverId+"' value='"+approvers[i].ApproverId+"'>";
				htmls+="<label class='lbl widthSize20_per'>Action Type:</label><input class='k-textbox' id='actionType-"+approvers[i].ApproverId+"' value='"+approvers[i].ActionType+"' disabled='disabled'></br>";
				htmls+="<label class='lbl widthSize20_per'>Reason of Review :</label><textarea id='appro-comments-"+approvers[i].ApproverId+"' class='k-textbox' disabled='disabled'>"+approvers[i].Comments+"</textarea></br>";

				htmls+="<label class='lbl widthSize20_per'>Date :</label><input class='k-textbox' id='approvedDate-"+approvers[i].ApproverId+"' value='"+appDate+"' disabled='disabled'></br></br>";
			}
			$("#"+container).html(htmls);

		} else {
			$("#"+container).html("No Comments");
		}
	},


	TemplateAppliedDateView: function(data) {

		var finalDateTime="";
		var date=kendo.toString(kendo.parseDate(data),"dd-MMM-yyyy");
		var time=kendo.toString(kendo.parseDate(data),"hh:mm tt");
		if(date=='01-01-0001'||date=="01-Jan-0001") {
			return finalDateTime;
		}
		if(time=="12:00 AM") {
			time="";
		}
		if(date!="") {
			finalDateTime=date+" "+time;
		}

		return finalDateTime;
	},

	GenerateProfilePicture: function(data) {
		//debugger;
		var pathImg="";
		//if (data.ApplicantPhotoPath != "" && data.ApplicantPhotoPath != null) {
		//    var pathImg = assembly.CvBankPath + 'api/Applicants/GetFileById/?id=' + data.ApplicantPhotoPath;

		//    $("#imgProfilePicture").attr('src', pathImg);
		//    $("#hdnProfilePicture").val(data.ApplicantPhotoPath);

		//} else {

		//    if (data.ProfilePicture != "" && data.ProfilePicture != null) {
		//        $("#imgProfilePicture").attr('src', data.ProfilePicture);
		//        $("#hdnProfilePicture").val(data.ProfilePicture);
		//        $("#imgProfilePictureDownload").prop("href", data.ProfilePicture);
		//    } else {
		//        if (data.Gender == 1) {
		//            pathImg = '../Images/male.png';
		//        } else {
		//            pathImg = '../Images/female.png';
		//        }
		//    }
		//}

		if(data.ProfilePicture!=""&&data.ProfilePicture!=null&&data.ProfilePicture.includes('/')) {
			pathImg=data.ProfilePicture;
		} else if(data.ApplicantPhotoPath!=""&&data.ApplicantPhotoPath!=null) {
			pathImg=assembly.CvBankPath+'api/Applicants/GetFileById/?id='+data.ApplicantPhotoPath;


		} else {

			if(data.Gender==1) {
				pathImg='../Images/male.png';
			} else {
				pathImg='../Images/female.png';
			}
		}



		return "<img id=\"imgProfilePicturegrid\" alt='Photo' src=\""+pathImg+"\" style=\"height:50px; width:50px; border-radius:150px;-webkit-border-radius:150px; -moz-border-radius: 150px;box-shadow:0 0 8px rgba(0, 0, 0, .8); -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, .8); -moz-box-shadow: 0 0 8px rgba(0, 0, 0, .8; \" /> ";
	},


	PopulateAllZoneCombo: function(identity) {
		var objZone=new Object();

		objZone=empressCommonManager.GetAllZoneCombo();

		$("#"+identity).kendoComboBox({
			placeholder: "Select Zone",
			dataTextField: "ZoneName",
			dataValueField: "ZoneId",
			dataSource: objZone
		});
	},

	PopulateRegionComboByZoneId: function(zoneId,identity) {
		var objRegion=new Object();
		if(zoneId=="") {
			zoneId=0;
		}

		objRegion=empressCommonManager.GetRegionComboByZoneId(zoneId);

		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "RegionName",
			dataValueField: "RegionId",
			dataSource: objRegion
		});
	},

	PopulateAreaComboByRegionId: function(regionId,identity) {
		var objArea=new Object();
		if(regionId=="") {
			regionId=0;
		}

		objArea=empressCommonManager.GetAreaComboByRegionId(regionId);

		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "AreaName",
			dataValueField: "AreaId",
			dataSource: objArea
		});
	},

	PopulateTerritoryComboAreaId: function(areaId,identity) {
		var objTerritory=new Object();
		if(areaId=="") {
			areaId=0;
		}

		objTerritory=empressCommonManager.GetTerritoryComboByAreaId(areaId);

		$("#"+identity).kendoComboBox({
			placeholder: "Select",
			dataTextField: "TerritoryName",
			dataValueField: "TerritoryId",
			dataSource: objTerritory
		});

	},


};