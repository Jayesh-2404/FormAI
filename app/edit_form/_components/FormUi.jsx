import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import FieldEdit from "./FieldEdit";
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import moment from "moment";
import { toast } from "sonner";
import { SignInButton, useUser } from "@clerk/nextjs";

function FormUi({
  jsonForm,
  selectedTheme,
  selectedStyle,
  onFieldUpdate,
  deleteField,
  editable = true,
  formId = 0,
  enabledSignIn = false,
}) {
  const [formData, setFormData] = useState({});
  const formRef = useRef(null);
  const { isSignedIn } = useUser();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (fieldName, itemName, value) => {
    const list = formData?.[fieldName] ? [...formData[fieldName]] : [];
    if (value) {
      list.push({ label: itemName, value: value });
      setFormData((prev) => ({ ...prev, [fieldName]: list }));
    } else {
      const updated = list.filter((item) => item.label !== itemName);
      setFormData((prev) => ({ ...prev, [fieldName]: updated }));
    }
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const result = await db.insert(userResponses).values({
      jsonResponse: formData,
      createdAt: moment().format("DD/MM/YYYY"),
      formRef: formId,
    });

    if (result) {
      formRef.current?.reset();
      setFormData({});
      toast.success("Response submitted successfully.");
    } else {
      toast.error("Could not submit the response.");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onFormSubmit}
      className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6"
      data-theme={selectedTheme}
      style={{
        boxShadow: selectedStyle?.key === "boxshadow" ? "5px 5px 0px black" : undefined,
        border: selectedStyle?.key === "border" ? selectedStyle.value : undefined,
      }}
    >
      <h2 className="text-center font-accent text-2xl font-semibold text-foreground">{jsonForm?.formTitle}</h2>
      <p className="mt-1 text-center text-sm text-muted-foreground">{jsonForm?.formHeading}</p>

      <div className="mt-6 space-y-2">
        {jsonForm?.fields?.map((field, index) => (
          <div key={`${field.fieldName || field.label}-${index}`} className="flex items-start gap-2">
            {field.fieldType === "select" ? (
              <div className="w-full space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
                <Select required={field?.required} onValueChange={(value) => handleSelectChange(field.fieldName, value)}>
                  <SelectTrigger className="w-full bg-transparent">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((item, itemIndex) => {
                      const value = item.label ? item.label : item;
                      return (
                        <SelectItem key={`${value}-${itemIndex}`} value={value}>
                          {value}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            ) : field.fieldType === "radio" ? (
              <div className="w-full space-y-2">
                <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
                <RadioGroup required={field?.required}>
                  {field.options?.map((item, itemIndex) => (
                    <div key={`${item.label || item}-${itemIndex}`} className="flex items-center gap-2">
                      <RadioGroupItem value={item.label || item} id={`${field.fieldName}-${itemIndex}`} onClick={() => handleSelectChange(field.fieldName, item.label || item)} />
                      <Label htmlFor={`${field.fieldName}-${itemIndex}`}>{item.label || item}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ) : field.fieldType === "checkbox" ? (
              <div className="w-full space-y-2">
                <label className="text-xs font-medium text-muted-foreground">{field?.label}</label>
                {field?.options ? (
                  field.options.map((item, itemIndex) => (
                    <div key={`${item.label || item}-${itemIndex}`} className="flex items-center gap-2">
                      <Checkbox onCheckedChange={(value) => handleCheckboxChange(field?.label, item.label ? item.label : item, value)} />
                      <span className="text-sm text-foreground">{item.label ? item.label : item}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2">
                    <Checkbox required={field.required} />
                    <span className="text-sm text-foreground">{field.label}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
                <Input
                  type={field?.type}
                  placeholder={field.placeholder}
                  name={field.fieldName}
                  className="bg-transparent"
                  required={field?.required}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {editable ? (
              <FieldEdit
                defaultValue={field}
                onUpdate={(value) => onFieldUpdate(value, index)}
                deleteField={() => deleteField(index)}
              />
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-6">
        {!enabledSignIn || isSignedIn ? (
          <Button type="submit" className="w-full rounded-xl">
            Submit
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button type="button" className="w-full rounded-xl">
              Sign in before submitting
            </Button>
          </SignInButton>
        )}
      </div>
    </form>
  );
}

export default FormUi;
