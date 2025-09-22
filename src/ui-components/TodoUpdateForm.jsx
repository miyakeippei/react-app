/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getTodo } from "../graphql/queries";
import { updateTodo } from "../graphql/mutations";
const client = generateClient();
export default function TodoUpdateForm(props) {
  const {
    id: idProp,
    todo: todoModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    contractNumber: "",
    insuranceType: "",
    premium: "",
    nextPaymentDate: "",
  };
  const [contractNumber, setContractNumber] = React.useState(
    initialValues.contractNumber
  );
  const [insuranceType, setInsuranceType] = React.useState(
    initialValues.insuranceType
  );
  const [premium, setPremium] = React.useState(initialValues.premium);
  const [nextPaymentDate, setNextPaymentDate] = React.useState(
    initialValues.nextPaymentDate
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = todoRecord
      ? { ...initialValues, ...todoRecord }
      : initialValues;
    setContractNumber(cleanValues.contractNumber);
    setInsuranceType(cleanValues.insuranceType);
    setPremium(cleanValues.premium);
    setNextPaymentDate(cleanValues.nextPaymentDate);
    setErrors({});
  };
  const [todoRecord, setTodoRecord] = React.useState(todoModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTodo.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTodo
        : todoModelProp;
      setTodoRecord(record);
    };
    queryData();
  }, [idProp, todoModelProp]);
  React.useEffect(resetStateValues, [todoRecord]);
  const validations = {
    contractNumber: [{ type: "Required" }],
    insuranceType: [{ type: "Required" }],
    premium: [{ type: "Required" }],
    nextPaymentDate: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          contractNumber,
          insuranceType,
          premium,
          nextPaymentDate: nextPaymentDate ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateTodo.replaceAll("__typename", ""),
            variables: {
              input: {
                id: todoRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TodoUpdateForm")}
      {...rest}
    >
      <TextField
        label="Contract number"
        isRequired={true}
        isReadOnly={false}
        value={contractNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              contractNumber: value,
              insuranceType,
              premium,
              nextPaymentDate,
            };
            const result = onChange(modelFields);
            value = result?.contractNumber ?? value;
          }
          if (errors.contractNumber?.hasError) {
            runValidationTasks("contractNumber", value);
          }
          setContractNumber(value);
        }}
        onBlur={() => runValidationTasks("contractNumber", contractNumber)}
        errorMessage={errors.contractNumber?.errorMessage}
        hasError={errors.contractNumber?.hasError}
        {...getOverrideProps(overrides, "contractNumber")}
      ></TextField>
      <TextField
        label="Insurance type"
        isRequired={true}
        isReadOnly={false}
        value={insuranceType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              contractNumber,
              insuranceType: value,
              premium,
              nextPaymentDate,
            };
            const result = onChange(modelFields);
            value = result?.insuranceType ?? value;
          }
          if (errors.insuranceType?.hasError) {
            runValidationTasks("insuranceType", value);
          }
          setInsuranceType(value);
        }}
        onBlur={() => runValidationTasks("insuranceType", insuranceType)}
        errorMessage={errors.insuranceType?.errorMessage}
        hasError={errors.insuranceType?.hasError}
        {...getOverrideProps(overrides, "insuranceType")}
      ></TextField>
      <TextField
        label="Premium"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={premium}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              contractNumber,
              insuranceType,
              premium: value,
              nextPaymentDate,
            };
            const result = onChange(modelFields);
            value = result?.premium ?? value;
          }
          if (errors.premium?.hasError) {
            runValidationTasks("premium", value);
          }
          setPremium(value);
        }}
        onBlur={() => runValidationTasks("premium", premium)}
        errorMessage={errors.premium?.errorMessage}
        hasError={errors.premium?.hasError}
        {...getOverrideProps(overrides, "premium")}
      ></TextField>
      <TextField
        label="Next payment date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={nextPaymentDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              contractNumber,
              insuranceType,
              premium,
              nextPaymentDate: value,
            };
            const result = onChange(modelFields);
            value = result?.nextPaymentDate ?? value;
          }
          if (errors.nextPaymentDate?.hasError) {
            runValidationTasks("nextPaymentDate", value);
          }
          setNextPaymentDate(value);
        }}
        onBlur={() => runValidationTasks("nextPaymentDate", nextPaymentDate)}
        errorMessage={errors.nextPaymentDate?.errorMessage}
        hasError={errors.nextPaymentDate?.hasError}
        {...getOverrideProps(overrides, "nextPaymentDate")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || todoModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || todoModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
