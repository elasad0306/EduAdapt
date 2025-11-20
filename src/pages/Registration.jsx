import InputWithLabel from '../Components/InputWithLabel/InputWithLabel.jsx';
import Button from '../Components/Buttons/Button.jsx';
function Registration() {
    return (
        <div className="min-h-screen flex items-center justify-center text-black">
            <form className="border-gray-900 border p-6 flex flex-col space-y-4 w-150" action="" method="POST">
                <h1 className="text-2xl font-semibold text-center">Inscription</h1>
                <InputWithLabel label="Nom*" />
                <InputWithLabel label="Prénom*" />
                <InputWithLabel label="Email*" />
                <InputWithLabel label="Adresse" />
                <InputWithLabel label="Téléphone" />
                <InputWithLabel label="Mot de passe*" />
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