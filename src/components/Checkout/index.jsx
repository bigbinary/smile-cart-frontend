import React from "react";

import { Typography, Checkbox } from "neetoui";
import { Form as NeetoUIForm, Input, Select } from "neetoui/formik";

const Checkout = () => (
  <NeetoUIForm
    formProps={{
      noValidate: true,
      className: "flex w-full flex-col gap-y-4 pb-6 w-1/2 m-2",
    }}
    formikProps={
      {
        // initialValues: PROJECT_INITIAL_VALUES,
        // validationSchema: PROJECT_VALIDATION_SCHEMA,
      }
    }
  >
    <Input label="Contact" name="name" placeholder="Enter contact number" />
    <Typography className="h4" weight="bold">
      Shipping address
    </Typography>
    <Select
      isMulti
      label="Country/Region"
      labelProps={{ className: "w-full" }}
      name="selectedMembers"
      options={() => {}}
    />
    <div className="flex space-x-2">
      <Input
        required
        label="First name"
        name="name"
        placeholder="Enter contact number"
      />
      <Input
        required
        label="Last name"
        name="name"
        placeholder="Enter contact number"
      />
    </div>
    <Input
      required
      label="Address"
      name="name"
      placeholder="Enter contact number"
    />
    <Input
      required
      label="Apartment"
      name="name"
      placeholder="Enter contact number"
    />
    <div className="flex space-x-2">
      <Input
        required
        label="City"
        name="name"
        placeholder="Enter contact number"
      />
      <Input
        required
        label="State"
        name="name"
        placeholder="Enter contact number"
      />
      <Input
        required
        label="ZIP Code"
        name="name"
        placeholder="Enter contact number"
      />
    </div>
    <Checkbox
      checked
      id="checkbox_name"
      label="Save this information for next time"
      onChange={function noRefCheck() {}}
    />
  </NeetoUIForm>
);

export default Checkout;
