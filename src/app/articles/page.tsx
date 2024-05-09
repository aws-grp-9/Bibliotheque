'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

// Définir le type pour les données d'actualités
interface Article {
  id: number;
  slug: string;
  image: string;
  title: string;
  description: string;
}

const ArticlePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Simuler une requête pour récupérer les actualités depuis une API
    // Remplacez cette section avec votre logique de récupération d'actualités depuis votre API
    const fetchArticles = async () => {
      // Ici, vous pouvez effectuer une requête HTTP pour récupérer les données d'actualités depuis une API
      // Par exemple, avec fetch() ou axios
      // Pour l'instant, nous utilisons des données statiques pour simuler les actualités
      const data: Article[] = [
        {
          id: 1,
          slug: 'recherche-empirique',
          image: '/flower.jpg',
          title: 'Recherche empirique',
          description: '"L\'impact des réseaux sociaux sur la santé mentale des adolescents : une étude longitudinale"'
        },
        {
          id: 2,
          slug: 'revues-de-litterature',
          image: '/geographie.jpg',
          title: 'Revues de littérature',
          description: ' "Une revue de la littérature sur les approches de gestion du stress en milieu professionnel"'
        },
        {
          id: 3,
          slug: 'theorie-et-analyse-critique',
          image: '/langue.jpg',
          title: 'Théorie et analyse critique',
          description: 'Développement d\'un modèle intégré de l\'apprentissage auto-régulé chez les étudiants universitaires'
        }
      ];

      // Mettre à jour l'état des articles avec les données récupérées
      setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <>
      <Navbar />
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8 text-center">NOS ARTICLES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`}>
                <div>
                  <div className="group relative overflow-hidden border border-gray-200 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">
                    <div className="h-64 relative">
                      <Image
                        src={article.image}
                        alt={article.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
                      <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                      <p className="text-sm text-gray-600">{article.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center">
          <Link href="/book">
            <Button variant="secondary" size="lg" className="active:scale-95 transition focus:outline focus:outline-gray-300 font-medium w-full sm:w-fit mt-8">Plus de ressources ici</Button>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ArticlePage;
