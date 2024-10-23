import { env } from "@/env";
import { useCreateBackInStockNotificationRequest } from "@/hooks/back-in-stock";
import { requiredString } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { products } from "@wix/stores";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingButton from "./LoadingButton";
import { Button, ButtonProps } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  email: requiredString.email(),
});

type FormValues = z.infer<typeof formSchema>;

interface BackInStockNotificationButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
}

export default function BackInStockNotificationButton({
  product,
  selectedOptions,
  ...props
}: BackInStockNotificationButtonProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useCreateBackInStockNotificationRequest();

  async function onSubmit({ email }: FormValues) {
    mutation.mutate({
      email,
      itemUrl: env.NEXT_PUBLIC_BASE_URL + "/products/" + product.slug,
      product,
      selectedOptions,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props}>Notificar quando disponível</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notificar quando disponível</DialogTitle>
          <DialogDescription>
            Insira seu endereço de e-mail e nós avisaremos quando este produto
            estiver disponível novamente.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={mutation.isPending}>
              Notificar-me
            </LoadingButton>
          </form>
        </Form>
        {mutation.isSuccess && (
          <div className="py-2.5 text-green-500">
            Obrigado! Nós o notificaremos quando este produto estiver disponível novamente.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
