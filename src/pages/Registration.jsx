import InputWithLabel from '../components/InputWithLabel/InputWithLabel';
import Button from '../Components/Buttons/Button';


function Registration() {
    return (
        <div className="min-h-screen flex items-center justify-center text-black">
            <form className="border-gray-900 border p-6 flex flex-col space-y-4 w-150" action="" method="POST">
                <h1 className="text-2xl font-semibold text-center">Inscription</h1>
                <InputWithLabel NameLabel="Nom*" idInput="name"/>
                <InputWithLabel NameLabel="Prénom*" idInput="firstname"/>
                <InputWithLabel NameLabel="Email*" idInput="email"/>
                <InputWithLabel NameLabel="Adresse" idInput="address"/>
                <InputWithLabel NameLabel="Téléphone" idInput="phoneNumber"/>
                <InputWithLabel NameLabel="Mot de passe*" idInput="password"/>
                <p className="text-sm">* Champs obligatoires</p>
                <Button NameButton="S'inscrire" />
                <div className="text-center">
                    <p>Déjà un compte ? <a href="Connexion.jsx" className="text-blue-600">Connectez-vous ici</a></p>
                </div>
            </form>
        </div>
    );
}

export default Registration;