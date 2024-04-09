import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createBusiness } from "@/utils/apis/business/api";
import {
  BusinessSchema,
  INewBusiness,
  businessSchema,
} from "@/utils/apis/business/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Props {
  addData?: INewBusiness;
}

const CreateBusiness = (props: Props) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addData } = props;

  const form = useForm<BusinessSchema>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      image: new File([], ""),
      title: "",
      capital: "",
      description: "",
      proposal: new File([], ""),
    },
  });

  useEffect(() => {
    setAddData();
  }, [addData, form.formState.isSubmitSuccessful]);

  function setAddData() {
    let modeType: "add" | "edit" = "add";
    if (addData) {
      modeType = "add";
      form.setValue("title", addData.title);
      form.setValue("capital", addData.capital);
      form.setValue("description", addData.description);
    }
    form.setValue("mode", modeType);
  }

  async function onSubmit(data: BusinessSchema) {
    try {
      const result = await createBusiness(data);
      toast({
        description: result.message,
      });
      navigate("/my-business");
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      <div className="mb-8 mt-2 flex">
        <p className="text-2xl font-semibold">Create New Business</p>
      </div>
      <div>
        <Form {...form}>
          <form
            data-testid="form-create-business"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3"
          >
            <div className="w-1/2">
              <CustomFormField
                control={form.control}
                name="image"
                label="Image"
              >
                {(field) => (
                  <Input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple={false}
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                    className="w-11/12"
                  />
                )}
              </CustomFormField>
            </div>
            <div className="grow space-y-5">
              <CustomFormField
                control={form.control}
                name="title"
                label="Business Title"
              >
                {(field) => (
                  <Input
                    placeholder="name of your business"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                    className="rounded-full"
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="description"
                label="Description"
              >
                {(field) => (
                  <Textarea
                    placeholder="Your business description..."
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                    className="rounded-2xl"
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="capital"
                label="Amount"
              >
                {(field) => (
                  <Input
                    placeholder="Your amount of capital"
                    type="amount"
                    data-testid="amount"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                    className="rounded-full"
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="proposal"
                label="File Proposal"
              >
                {(field) => (
                  <Input
                    type="file"
                    accept="application/pdf"
                    multiple={false}
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                )}
              </CustomFormField>
              <Button
                type="submit"
                data-testid="btn-submit"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className="rounded-full px-8 mt-7"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default CreateBusiness;
