import { Loader} from "@egovernments/digit-ui-react-components";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import { default as EmployeeApp } from "./pages/employee";
import projectCard from "./components/projectCard";
import ViewEstimateComponent from "./components/ViewEstimateComponent";
import DrugSearch from "./pages/employee/DrugSearch";
import SearchProductVar from "./pages/employee/SearchProductVar";
import SearchHousehold from "./pages/employee/SearchHousehold";
import SearchTask from "./pages/employee/SearchTask";
import SearchBeneficiary from "./pages/employee/SearchBeneficiary";
import SearchProjectStaff from "./pages/employee/SearchProjectStaff";
import Search from "./pages/employee/Search";

export const projectModule = ({ stateCode, userType, tenants }) => {
  const { path, url } = useRouteMatch();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const moduleCode = ["proj", "common","workflow", tenantId];
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({
    stateCode,
    moduleCode,
    language,
  });

  if (isLoading) {
    return <Loader />;
  }
  return <EmployeeApp path={path} stateCode={stateCode} userType={userType} tenants={tenants} />;
};

const componentsToRegister = {
  projectModule,
  projectCard,
  ProjectModule:projectModule,
  ProjectCard:projectCard,
  DrugSearch,
  ViewEstimatePage: ViewEstimateComponent,
  SearchProductVar,
  SearchHousehold,
  SearchTask,
  SearchBeneficiary,
  SearchProjectStaff,
  Search
};
//init <modulename >component
export const initprojectComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
