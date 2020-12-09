import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

import { initLibraries } from "@egovernments/digit-ui-libraries";
import { DigitUI } from "@egovernments/digit-ui-module-core";
// import { PGRModule, PGRLinks } from "@egovernments/digit-ui-module-pgr";
// import { Body, TopBar } from "@egovernments/digit-ui-react-components";
import "@egovernments/digit-ui-css/example/index.css";

initLibraries();

const citizenInfoDummy = {
  userInfo: {
    id: 23349,
    uuid: "530968f3-76b3-4fd1-b09d-9e22eb1f85df",
    userName: "9404052047",
    name: "Aniket T",
    mobileNumber: "9404052047",
    emailId: "xc@gmail.com",
    locale: null,
    type: "CITIZEN",
    roles: [
      {
        name: "Citizen",
        code: "CITIZEN",
        tenantId: "pb",
      },
    ],
    active: true,
    tenantId: "pb",
  },
};

const employeeInfoDummy = {
  userInfo: {
    id: 24226,
    uuid: "11b0e02b-0145-4de2-bc42-c97b96264807",
    userName: "amr001",
    name: "leela",
    mobileNumber: "9814424443",
    emailId: "leela@llgmail.com",
    locale: null,
    type: "EMPLOYEE",
    roles: [
      {
        name: "CSC Collection Operator",
        code: "CSC_COLL_OPERATOR",
        tenantId: "pb.amritsar",
      },
      {
        name: "Employee",
        code: "EMPLOYEE",
        tenantId: "pb.amritsar",
      },
      {
        name: "NoC counter employee",
        code: "NOC_CEMP",
        tenantId: "pb.amritsar",
      },
      {
        name: "Grievance Routing Officer",
        code: "GRO",
        tenantId: "pb.amritsar",
      },
      {
        name: "TL Counter Employee",
        code: "TL_CEMP",
        tenantId: "pb.amritsar",
      },
      {
        name: "TL Field Inspector",
        code: "TL_FIELD_INSPECTOR",
        tenantId: "pb.amritsar",
      },
      {
        name: "TL Creator",
        code: "TL_CREATOR",
        tenantId: "pb.amritsar",
      },
      {
        name: "NoC counter Approver",
        code: "NOC_APPROVER",
        tenantId: "pb.amritsar",
      },
      {
        name: "Customer Support Representative",
        code: "CSR",
        tenantId: "pb.amritsar",
      },
      {
        name: "TL Approver",
        code: "TL_APPROVER",
        tenantId: "pb.amritsar",
      },
      {
        name: "BPA Services Approver",
        code: "BPA_APPROVER",
        tenantId: "pb.amritsar",
      },
      {
        name: "Field Employee",
        code: "FEMP",
        tenantId: "pb.amritsar",
      },
      {
        name: "Counter Employee",
        code: "CEMP",
        tenantId: "pb.amritsar",
      },
      {
        name: "NoC Field Inpector",
        code: "NOC_FIELD_INSPECTOR",
        tenantId: "pb.amritsar",
      },
      {
        name: "Grievance Officer",
        code: "GO",
        tenantId: "pb.amritsar",
      },
      {
        name: "Super User",
        code: "SUPERUSER",
        tenantId: "pb.amritsar",
      },
      {
        name: "NOC Department Approver",
        code: "NOC_DEPT_APPROVER",
        tenantId: "pb.amritsar",
      },
      {
        name: "NoC Doc Verifier",
        code: "NOC_DOC_VERIFIER",
        tenantId: "pb.amritsar",
      },
      {
        name: "Collection Operator",
        code: "COLL_OPERATOR",
        tenantId: "pb.amritsar",
      },
      {
        name: "Anonymous User",
        code: "ANONYMOUS",
        tenantId: "pb.amritsar",
      },
      {
        name: "TL doc verifier",
        code: "TL_DOC_VERIFIER",
        tenantId: "pb.amritsar",
      },
    ],
    active: true,
    tenantId: "pb.amritsar",
  },
};

const token = window.localStorage.getItem("token") || process.env.REACT_APP_TOKEN;

const citizenToken = window.localStorage.getItem("Citizen.token") || process.env.REACT_APP_CITIZEN_TOKEN;
const citizenInfo = window.localStorage.getItem("Citizen.user-info") || citizenInfoDummy;
const citizenTenantId = window.localStorage.getItem("Citizen.tenant-id") || "pb";

const employeeToken = window.localStorage.getItem("Employee.token") || process.env.REACT_APP_EMPLOYEE_TOKEN;
const employeeInfo = window.localStorage.getItem("Employee.user-info") || employeeInfoDummy;
const employeeTenantId = window.localStorage.getItem("Employee.tenant-id") || "pb.amritsar";

const userType = token === citizenToken ? "citizen" : "employee";
Digit.SessionStorage.set("user_type", userType);
Digit.SessionStorage.set("userType", userType);

const getUserDetails = (token, info) => ({ token, info })

const userDetails = userType === "citizen" ? getUserDetails(citizenToken, citizenInfo) : getUserDetails(employeeToken, employeeInfo)

Digit.SessionStorage.set("User", userDetails);

Digit.SessionStorage.set("Citizen.tenantId", citizenTenantId);
Digit.SessionStorage.set("Employee.tenantId", employeeTenantId);

ReactDOM.render(<DigitUI stateCode="pb" />, document.getElementById("root"));
