'use client'
import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Script from 'next/script';


const API_URL = process.env.NEXT_PUBLIC_API_URL;


const AjouterLivrePage = () => {
    const [titre, setTitre] = React.useState('');
    const [auteur, setAuteur] = React.useState('');
    const [genre, setGenre] = React.useState('');
    const [annee, setAnnee] = React.useState('');
    const [isbn, setISBN] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState<string | undefined>();
    const [error1, setError] = React.useState<string | undefined>();
    const [success, setSuccess] = React.useState<string | undefined>();
    const [isAdmin, setIsAdmin] = React.useState<any>(false);

    const genres = ["biologie","histoire","geographie","mathematiques","chimie","litterature","art","Informatique","physique","langue"];
    const router = useRouter();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            // if not an image file
            if (!file.type.startsWith('image/')) {
                event.target.value = '';
                setError('Veuillez choisir un fichier image.');
                return;
            }
            const fileSize = file.size / 1024 / 1024; // in MB
            const maxFileSize = 5; // in MB
            if (fileSize > maxFileSize) {
                event.target.value = '';
                setError('La taille de l\'image est trop grande. Veuillez choisir une image plus petite.');
                return;
            }
            const image = new Image();
            image.src = URL.createObjectURL(file);
            image.onload = () => {
                if (image.width > 2560 || image.height > 1600) {
                    event.target.value = '';
                    setError('Les dimensions de l\'image sont trop grandes. Veuillez choisir une image avec des dimensions jusqu\'à 2560x1600.');
                    return;
                }
                console.log(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    console.log(base64String);
                    setImage(base64String);
                };
                reader.readAsDataURL(file);
            };
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSuccess(undefined);
        const supabase = createClient();
        const {data,error} = await supabase.auth.getUser();
        const requestBody = {
            user_token : data,
            title: titre,
            author: auteur,
            genre: genre,
            date: annee,
            ISBN: isbn,
            description: description,
            image: image
        };

        if (!titre || !genre || !annee || !isbn) {
            console.log('Please fill in all required fields');
            return;
        }
        if (!/^\d{13}$/.test(isbn)) {
            setError('ISBN doit être composé de 13 chiffres.');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            if (response.status === 200) {
                resetForm();
                setSuccess('Le livre a été ajouté avec succès.');
            } else {
                console.log("TT");
                setError(data.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }

    }

    const resetForm = () => {
        setTitre('');
        setAuteur('');
        setGenre('');
        setAnnee('');
        setISBN('');
        setDescription('');
        setImage(undefined);
        setError(undefined);
        setSuccess(undefined);
    }

    const checkAdmin = async () => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        if (error || !data) {
            router.push('/');
            return;
        }
        const headers1 = new Headers();
        headers1.append('Content-Type', 'application/json');
        headers1.append('user_token',  JSON.stringify(data));
        const response1 = await fetch(`${API_URL}/api/user/personnal`,{
            method: 'GET',
            headers: headers1,
        });
        const query_data1 = await response1.json();
        if (response1.status !== 200) {
            router.push('/');
            return;
        }
        if (!query_data1.result.admin) {
            router.push('/');
            return;
        }
    };

    React.useEffect(() => {
        checkAdmin();
    } , []);
    return (
            <>
                <Navbar />
                <main className="bg-gray-100 min-h-screen flex justify-center items-center ">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-4/12">
                        <h2 className="text-3xl text-blue-500 font-semibold mb-6">Ajouter un livre</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre</label>
                                <input type="text" id="titre" name="titre" value={titre} onChange={(e) => setTitre(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required placeholder='Obligatoire'/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="auteur" className="block text-sm font-medium text-gray-700">Auteur</label>
                                <input type="text" id="auteur" name="auteur" value={auteur} onChange={(e) => setAuteur(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" placeholder='Optionnel'/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
                                <select id="genre" name="genre" value={genre} onChange={(e) => {setGenre(e.target.value)}} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required >
                                    <option value="">Choisir un genre</option>
                                    {genres.map((genre) => (
                                        <option key={genre} value={genre}>{genre.charAt(0).toUpperCase() + genre.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="annee" className="block text-sm font-medium text-gray-700">Année</label>
                                <input type="text" id="annee" name="annee" value={annee} onChange={(e) => setAnnee(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required placeholder='Obligatoire'/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">ISBN</label>
                                <input type="text" id="isbn" name="isbn" value={isbn} onChange={(e) => setISBN(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required placeholder='Obligatoire' />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full h-32" placeholder='Optionnel'/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                                <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-gray-700"/>
                            </div>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ajouter le livre</button>
                            <FormError message={error1}/>
                            <FormSuccess message={success}/>
                        </form>
                    </div>
                </main>
                <Footer />
            </>
    );
};

export default AjouterLivrePage;
