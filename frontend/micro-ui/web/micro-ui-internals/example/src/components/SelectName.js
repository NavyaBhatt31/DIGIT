import React from "react";
import { FormStep } from "@egovernments/digit-ui-react-components";
import PropTypes from 'prop-types';

const SelectName = ({ config, onSelect, onSkip, t }) => {
  return <FormStep config={config} onSelect={onSelect} t={t}></FormStep>;
};

SelectName.propTypes = {
  config: PropTypes.object,
  onSelect: PropTypes.func,
  onSkip: PropTypes.func,
  t: PropTypes.func,
};

export default SelectName;
