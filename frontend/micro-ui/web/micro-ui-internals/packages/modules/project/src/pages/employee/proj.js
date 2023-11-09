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
        populators: { name: "dateOfProposal", error: "Required", validation: { required: true } },
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
        populators: { name: "description", error: "Required", validation: { pattern: /^[A-Za-z]+$/i } },
      },
    
  
      {
        label: "File Reference Number",
        isMandatory: true,
        description: "Additional Details if any",
        key: "additionalDetails",
        type: "text",
        disable: false,
        populators: { name: "referenceID", error: "sample error message", validation: { pattern: /^[A-Za-z]+$/i } },
      },
      {
        
          label: "Project Type",
          type: "dropdown",
          isMandatory: false,
          disable: false,
          populators: {
            name: "projectType",
            // type: "wards",
            options: [
              { value: "Mini Park", label: "Mini Park" },
              { value: "Child Play Station", label: "Child Play Station" },
              { value: "Open Air Gym", label: "Open Air Gym" },
              { value: "Water Body", label: "Water Body" },
              { value: "Walking Track", label: "Walking Track" },
              { value: "Playground", label: "Playground" },
              { value: "Loo", label: "Loo" },
              { value: "Vending Zone", label: "Vending Zone" },
            ],
            defaultText: "COMMON_SELECT_WARD",
            selectedText: "COMMON_SELECTED",
            allowMultiSelect: false,
          },
        },
        {
          inline: true,
          label: "Estimated Cost (₹)",
          isMandatory: true,
          type: "text",
          disable: false,
          populators: { name: "estimatedCostInRs", error: "Required", validation: { pattern: /^[A-Za-z]+$/i } },
        },
        {
          inline: true,
          label: "Locality",
          isMandatory: true,
          type: "text",
          disable: false,
          populators: { name: "address", error: "Required", validation: { pattern: /^[A-Za-z]+$/i } },
        },
      {
        label: "Target Demography",
        type: "locationdropdown",
        isMandatory: false,
        disable: false,
        populators: {
          name: "projadditionalDetails",
          allowMultiSelect: false,
        },
      },

      {
        label: "Ward",
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
 

  const reqCriteriaCreate = {
      url: `/project/v1/_create`,
      params: { },
      body: {
        
        "tenantId": tenantId,
        "name": " ",
        "projectType": "",
        "projectSubType": "",
        "department": "",
        "description": "",
        "referenceID": "",
        "documents": [],
        "address":{ },
        "isTaskEnabled": false,
        "parent": "",
        "additionalDetails": {
            "estimatedCostInRs": "",
            "dateOfProposal": "",
            }, 
      },
      config: {
        enabled: true,
        // select: (data) => data?.Employees?.map((e) => ({ code: e?.code, name: e?.user?.name })),
      },

    };

   const mutation = Digit.Hooks.useCustomAPIMutationHook(reqCriteriaCreate);
   const history = useHistory();
 
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
    mutation.mutate(
      {
        params: {},
        body: {
          project: {
            ...data,
          },
          workflow: {
            action: "CREATE",

            comment: null,
          },
        },
      },
      {
        onError,
        onSuccess,
      }
    );
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
