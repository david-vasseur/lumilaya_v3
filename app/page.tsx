import BestProducts from "@/components/layout/landing/BestProducts";
import Collections from "@/components/layout/landing/Collections";
import { FAQ } from "@/components/layout/landing/Faq";
import { Hero } from "@/components/layout/landing/Hero";
import Quality from "@/components/layout/landing/Quality";
import { ReviewsSection } from "@/components/layout/landing/Review";

export default function Home() {

	return (
		<>
			<Hero />
			<Quality />
			<Collections />
			<BestProducts />
			<ReviewsSection />
			<FAQ />
		</>
		
	);
}
