import { HRIcon, EmployeeModuleCard, AttendanceIcon, PropertyHouse } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";

const projectCard = () => { 
  const { t } = useTranslation();

  const propsForModuleCard = {
    Icon: <PropertyHouse />,
    moduleName: t("Project"),
    kpis: [

    ],
    links: [
   
      {
        label: t("Project Create"),
        link: `/${window?.contextPath}/employee/project/create`,
      },
  
      {
        label: t("Project Search"),
        link: `/${window?.contextPath}/employee/project/search`,
      },
      
      
      {
        label: t("Product Search"),
        link: `/${window?.contextPath}/employee/project/drugsearch`,
      },
      
       
      {
        label: t("Product Variant Search"),
        link: `/${window?.contextPath}/employee/project/searchproductvar`,
      },

        
      {
        label: t("Household Search"),
        link: `/${window?.contextPath}/employee/project/searchhousehold`,
      },

        
      {
        label: t("Project Task Search"),
        link: `/${window?.contextPath}/employee/project/searchtask`,
      },

      {
        label: t("Project Benificiary Search"),
        link: `/${window?.contextPath}/employee/project/searchbeneficiary`,
      },

      {
        label: t("Project Staff Search"),
        link: `/${window?.contextPath}/employee/project/searchprojectstaff`,
      },


    ],
  };

  return <EmployeeModuleCard {...propsForModuleCard} />;

};

export default projectCard;