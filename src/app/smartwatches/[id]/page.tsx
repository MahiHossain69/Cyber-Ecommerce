import { ProductDetails } from "@/components/scenes/smartwatch/product-details";

export default async function SmartwatchDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main>
      <ProductDetails productId={id} />
    </main>
  );
}
