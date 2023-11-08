import { Loader, FormComposerV2 } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
// import { Urls } from "../../../../../libraries/src/services/atoms/urls";


export const newConfig = [
  
  {
    head: "Project details",
    body: [
      {
        inline: true,
        label: "Project Sanction Date",
        isMandatory: false,
        description: "Please enter Sanction Date",
        type: "date",
        disable: false,
        populators: { name: "sanction_date", error: "Required", validation: { required: true } },
      },
      {
        inline: true,
        label: "Project Name",
        isMandatory: true,
        type: "text",
        disable: false,
        populators: { name: "name", error: "Required", validation: { pattern: /^[A-Za-z]+$/i } },
      },
      {
        inline: true,
        label: "Project Description",
        isMandatory: true,
        type: "textarea",
        disable: false,
        populators: { name: "project_description", error: "Required", validation: { pattern: /^[A-Za-z]+$/i } },
      },
    
  
      {
        label: "File Reference Number",
        isMandatory: true,
        description: "Additional Details if any",
        key: "additionalDetails",
        type: "text",
        disable: false,
        populators: { name: "file_refrence_number", error: "sample error message", validation: { pattern: /^[A-Za-z]+$/i } },
      },
      {
        label: "Project Type",
        type: "locationdropdown",
        isMandatory: false,
        disable: false,
        populators: {
          name: "project",
          type: "ward",
          optionsKey: "i18nKey",
          defaultText: "COMMON_SELECT_WARD",
          selectedText: "COMMON_SELECTED",
          allowMultiSelect: false,
        },
      },
      {
        label: "Target Demography",
        type: "locationdropdown",
        isMandatory: false,
        disable: false,
        populators: {
          name: "project",
          type: "ward",
          optionsKey: "i18nKey",
          defaultText: "COMMON_SELECT_WARD",
          selectedText: "COMMON_SELECTED",
          allowMultiSelect: false,
        },
      },
    ],
  },
];
  
 const Create = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const history = useHistory();

  const requestCriteria1 = {
      url: `/project/v1/_create`,
      params: { tenantId },
      body: {},
      config: {
        enabled: true,
        select: (data) => data?.Employees?.map((e) => ({ code: e?.code, name: e?.user?.name })),
      },

    };


  const onSubmit = (data) => {
    console.log(data, "data");
    const onError = (resp) => {
      history.push(`/${window.contextPath}/employee/project/response?isSuccess=${false}`, { message: "TE_CREATION_FAILED" });
    };
    const onSuccess = (resp) => {
      history.push(`/${window.contextPath}/employee/project/response?appNo=${resp.contracts[0].supplementNumber}&isSuccess=${true}`, {
        message: isEdit ? "TE_EDIT_SUCCESS" : "TE_CREATION_SUCCESS",
        showID: true,
        label: "REVISED_WO_NUMBER",
      });
    };
  }
    const configs = newConfig ? newConfig : newConfig;

    return (
      <FormComposerV2
        heading={t("Create New Project")}
        label={t("Submit Bar")}
        // description={"Description"}
        //text={"Sample Text if required"}
        config={configs.map((config) => {
          return {
            ...config,
            body: config.body.filter((a) => !a.hideInEmployee),
          };
        })}
        defaultValues={{}}
        onSubmit={onSubmit}
        fieldStyle={{ marginRight: 0 }}
      />
    );
  
  };



export default Create;
