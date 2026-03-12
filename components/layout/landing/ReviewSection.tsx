"use client"

import { useRef, useEffect, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';

// Interface pour typage (compatible avec Google My Business API)
interface Review {
    id: number;
    author: string;
    authorImage?: string; // URL de l'image de profil
    rating: number; // 1 à 5
    date: string; // ISO date string
    text: string;
    source?: 'google' | 'manual'; // Pour distinguer l'origine
}

// Reviews fictives (à remplacer par les données de l'API Google My Business)
const reviews: Review[] = [
    {
        id: 1,
        author: "Sophie Martin",
        // authorImage: "/images/avatars/avatar1.jpg", 
        rating: 5,
        date: "2024-11-15T10:30:00Z",
        text: "Des bougies exceptionnelles ! L'odeur de lavande est subtile et naturelle, rien à voir avec les parfums synthétiques. La combustion est propre et dure vraiment longtemps. Je recommande à 100%.",
        source: "google"
    },
    {
        id: 2,
        author: "Thomas Dubois",
        rating: 5,
        date: "2024-11-10T14:20:00Z",
        text: "J'ai offert un coffret à ma mère pour son anniversaire, elle était ravie ! La qualité est au rendez-vous et l'emballage est magnifique. Service client très réactif.",
        source: "google"
    },
    {
        id: 3,
        author: "Marie Lefebvre",
        rating: 5,
        date: "2024-11-05T16:45:00Z",
        text: "Enfin des bougies vraiment naturelles ! Je suis sensible aux parfums chimiques et là, aucun problème. L'atmosphère créée est apaisante et chaleureuse. Mon salon sent divinement bon.",
        source: "google"
    },
    {
        id: 4,
        author: "Laurent Petit",
        rating: 4,
        date: "2024-10-28T09:15:00Z",
        text: "Très bonne qualité, j'apprécie particulièrement la transparence sur la composition. Le prix est un peu élevé mais justifié par la qualité artisanale. Je rachèterai certainement.",
        source: "google"
    },
    {
        id: 5,
        author: "Céline Rousseau",
        rating: 5,
        date: "2024-10-20T11:00:00Z",
        text: "Un vrai coup de cœur ! Les senteurs sont délicates et naturelles. J'adore le concept LUMILAYA, c'est exactement ce que je recherchais. Livraison rapide et soignée.",
        source: "google"
    },
];

// Fonction utilitaire pour formater la date
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
};

// Composant pour afficher les étoiles
const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-5 h-5 ${
                        star <= rating 
                            ? 'fill-[#7A9B8E] text-[#7A9B8E]' 
                            : 'fill-none text-[#2C2C2C]/20'
                    }`}
                />
            ))}
        </div>
    );
};

export const ReviewsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Calcul de la note moyenne
    const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);

    // Nombre d'avis visibles selon la taille d'écran
    const getVisibleCount = () => {
        if (typeof window === 'undefined') return 3;
        return window.innerWidth >= 1024 ? 3 : 1;
    };

    const [visibleCount, setVisibleCount] = useState(getVisibleCount());

    useEffect(() => {
        const handleResize = () => {
            setVisibleCount(getVisibleCount());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Défilement automatique
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const maxIndex = reviews.length - visibleCount;
                return prev >= maxIndex ? 0 : prev + 1;
            });
        }, 5000); // Change toutes les 5 secondes

        return () => clearInterval(interval);
    }, [isPaused, visibleCount]);

    // Navigation
    const goToNext = () => {
        setCurrentIndex((prev) => {
            const maxIndex = reviews.length - visibleCount;
            return prev >= maxIndex ? 0 : prev + 1;
        });
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => {
            const maxIndex = reviews.length - visibleCount;
            return prev <= 0 ? maxIndex : prev - 1;
        });
    };

    useGSAP(() => {
        gsap.from('.reviews-header', {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
            }
        });

        gsap.from('.carousel-container', {
            y: 80,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.carousel-container',
                start: 'top 75%',
            }
        });
    }, []);

    return (
        <section 
            ref={sectionRef}
            className="w-full bg-linear-to-b from-[#F5F1EB] to-[#FDFBF7] py-16 lg:py-24"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="reviews-header text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#7A9B8E]/10 px-4 py-2 rounded-full mb-4">
                        <Star className="w-5 h-5 text-[#7A9B8E] fill-[#7A9B8E]" />
                        <span className="text-sm font-medium text-[#7A9B8E]">Avis clients</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl text-[#2C2C2C] font-light mb-4">
                        Ce que nos clients pensent de nous
                    </h2>
                    
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <div className="flex items-center gap-2">
                            <span className="text-5xl font-light text-[#2C2C2C]">{averageRating}</span>
                            <div>
                                <StarRating rating={Math.round(parseFloat(averageRating))} />
                                <p className="text-sm text-[#2C2C2C]/60 mt-1">
                                    Basé sur {reviews.length} avis
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carousel Container */}
                <div 
                    className="carousel-container relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Navigation Buttons */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:bg-[#F5F1EB] group"
                        aria-label="Avis précédent"
                    >
                        <ChevronLeft className="w-6 h-6 text-[#7A9B8E] group-hover:text-[#6A8B7E]" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:bg-[#F5F1EB] group"
                        aria-label="Avis suivant"
                    >
                        <ChevronRight className="w-6 h-6 text-[#7A9B8E] group-hover:text-[#6A8B7E]" />
                    </button>

                    {/* Carousel */}
                    <div className="overflow-hidden py-5">
                        <div
                            ref={carouselRef}
                            className="flex transition-transform duration-500 ease-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
                            }}
                        >
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="shrink-0 px-4"
                                    style={{ width: `${100 / visibleCount}%` }}
                                >
                                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative h-full">
                                        {/* Icône quote décorative */}
                                        <div className="absolute top-6 right-6 opacity-5">
                                            <Quote className="w-16 h-16 text-[#7A9B8E]" />
                                        </div>

                                        {/* Header du review */}
                                        <div className="flex items-start justify-between mb-4 relative z-10">
                                            <div className="flex items-center gap-3">
                                                {/* Avatar (utiliser l'image si disponible, sinon initiales) */}
                                                {review.authorImage ? (
                                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                                        <Image
                                                            src={review.authorImage}
                                                            alt={review.author}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-12 h-12 bg-[#7A9B8E]/10 rounded-full flex items-center justify-center shrink-0">
                                                        <span className="text-[#7A9B8E] font-medium text-lg">
                                                            {review.author.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                    </div>
                                                )}
                                                
                                                <div>
                                                    <h3 className="font-medium text-[#2C2C2C]">
                                                        {review.author}
                                                    </h3>
                                                    <p className="text-xs text-[#2C2C2C]/50">
                                                        {formatDate(review.date)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="mb-4">
                                            <StarRating rating={review.rating} />
                                        </div>

                                        {/* Texte du review */}
                                        <p className="text-[#2C2C2C]/70 leading-relaxed">
                                            {review.text}
                                        </p>

                                        {/* Badge source (optionnel) */}
                                        {review.source === 'google' && (
                                            <div className="mt-4 pt-4 border-t border-[#2C2C2C]/5">
                                                <span className="text-xs text-[#2C2C2C]/40">
                                                    Avis Google
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Indicateurs de pagination */}
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: reviews.length - visibleCount + 1 }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all ${
                                    currentIndex === index 
                                        ? 'w-8 bg-[#7A9B8E]' 
                                        : 'w-2 bg-[#2C2C2C]/20 hover:bg-[#2C2C2C]/40'
                                }`}
                                aria-label={`Aller à l'avis ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA Google Reviews */}
                <div className="text-center mt-12">
                    <p className="text-[#2C2C2C]/60 mb-4">
                        Partagez votre expérience avec LUMILAYA
                    </p>
                    <a 
                        href="https://g.page/r/CQgc2Co6LkOzEAE/review/" // À remplacer par votre lien Google My Business
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#7A9B8E] text-white px-6 py-3 rounded-full hover:bg-[#6A8B7E] transition-all shadow-lg hover:shadow-xl"
                    >
                        <Star className="w-5 h-5" />
                        Laisser un avis
                    </a>
                </div>
            </div>
        </section>
    );
};

/* 
=============================================================================
INTÉGRATION AVEC GOOGLE MY BUSINESS API
=============================================================================

Pour connecter cette section à l'API Google My Business, voici les étapes :

1. Installer les dépendances nécessaires :
   npm install @google-cloud/local-auth googleapis

2. Créer un fichier pour l'API Google (ex: lib/googleReviews.ts) :

   import { google } from 'googleapis';

   export async function getGoogleReviews() {
     const auth = await google.auth.getClient({
       scopes: ['https://www.googleapis.com/auth/business.manage'],
     });

     const mybusiness = google.mybusinessaccountmanagement({
       version: 'v1',
       auth,
     });

     // Récupérer les avis
     const response = await mybusiness.locations.reviews.list({
       parent: 'accounts/YOUR_ACCOUNT_ID/locations/YOUR_LOCATION_ID',
     });

     // Transformer les données au format Review
     return response.data.reviews?.map(review => ({
       id: review.reviewId || '',
       author: review.reviewer?.displayName || 'Anonyme',
       authorImage: review.reviewer?.profilePhotoUrl,
       rating: review.starRating === 'FIVE' ? 5 : 
               review.starRating === 'FOUR' ? 4 : 
               review.starRating === 'THREE' ? 3 : 
               review.starRating === 'TWO' ? 2 : 1,
       date: review.createTime || new Date().toISOString(),
       text: review.comment || '',
       source: 'google' as const,
     })) || [];
   }

3. Utiliser les données dans votre composant :

   import { getGoogleReviews } from '@/lib/googleReviews';

   export async function ReviewsSection() {
     const reviews = await getGoogleReviews();
     // ... reste du composant
   }

4. Variables d'environnement (.env.local) :
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_ACCOUNT_ID=your_account_id
   GOOGLE_LOCATION_ID=your_location_id

=============================================================================
*/