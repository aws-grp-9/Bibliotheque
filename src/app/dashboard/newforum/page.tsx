import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';

const ChatPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="max-w-5xl mx-auto my-4 px-2">
          <h2 className="text-4xl font-bold mb-5 text-left text-gray-2000">Discussion en direct</h2>
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-9 mt-9">
            {/* Messages de discussion */}
            <div className="overflow-y-auto max-h-96">
              {/* Exemple de messages */}
              <div className="flex flex-col space-y-6">
                {/* Message 1 */}
                <div className="flex items-start flex-col sm:flex-row">
                  <div className="bg-blue-200 p-6 rounded-lg max-w-max">
                    <p className="text-lg font-medium text-blue-900">Lecteur</p>
                    <p className="text-lg mt-2">Bonjour !</p>
                  </div>
                  <p className="text-gray-500 text-sm ml-6 self-end">10:00</p>
                </div>
                {/* Message 2 */}
                <div className="flex items-start flex-col sm:flex-row">
                  <div className="bg-green-500 p-6 rounded-lg max-w-max">
                    <p className="text-lg font-medium text-green-900">Bibliothéquaire</p>
                    <p className="text-lg mt-2">Salut Jean, comment ça va ?</p>
                  </div>
                  <p className="text-gray-500 text-sm ml-6 self-end">10:05</p>
                </div>
              </div>
            </div>
            
            {/* Zone de saisie du message */}
            <div className="mt-6 flex items-center">
              <input
                type="text"
                placeholder="Tapez votre message..."
                className="border border-gray-300 rounded-lg px-4 py-3 w-full mr-4 focus:outline-none"
              />
              <button className="bg-blue-500 text-white rounded-lg px-6 py-3">Envoyer</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ChatPage;
