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
        label: t("Create"),
        link: `/${window?.contextPath}/employee/project/create`,
      },
  
      // {
      //   label: t("Search"),
      //   link: `/${window?.contextPath}/employee/project/search`,
      // },
      
      
      {
        label: t("SEARCH_DRUG"),
        link: `/${window?.contextPath}/employee/project/drugsearch`,
      },

      
      {
        label: t("DRUG_INBOX"),
        link: `/${window?.contextPath}/employee/project/druginbox`,
      },
  
    ],
  };

  return <EmployeeModuleCard {...propsForModuleCard} />;

};

export default projectCard;