"use client"

import BestCard from '@/components/ui/BestCard';

export interface IBestCard {
    id: number,
    collection: string,
    name: string,
    slug: string,
    images: string,
    variants: IVariants
}

export interface IVariants {
    id: number,
    name: string,
    duration: string,
    price: number
}


async function BestProducts() {

    const products: IBestCard[] = [
        {
            id: 1,
            collection: "Terre",
            name: "Protection",
            slug: "bougie-protection",
            images: "/images/produits/protection.webp",
            variants: { id: 1, name: "Bougie Protection 200g", duration: "30", price: 32 }
        },
        {
            id: 2,
            collection: "Emotion",
            name: "Magie",
            slug: "bougie-magie",
            images: "/images/produits/magie.webp",
            variants: { id: 1, name: "Bougie Magie 150g", duration: "25", price: 19.90 } 
        },
        {
            id: 3,
            collection: "Terre",
            name: "Libération",
            slug: "bougie-liberation",
            images: "/images/produits/liberation.webp",
            variants: { id: 1, name: "Bougie Libération 200g", duration: "30", price: 32 }
        }
    ]

    return <BestCard products={products} />
}

export default BestProducts;