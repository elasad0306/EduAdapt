import { Twitter } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Linkedin } from 'lucide-react';
function Footer() {
	return (
		<footer className="mt-12 bg-gray-900 text-gray-200">
			<div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
				<div>
					<h3 className="text-2xl font-semibold text-white">EduAdapt</h3>
					<p className="mt-2 text-lg">Apprenez, collaborez et réussissez — partout, à tout moment.</p>
				</div>

				<div>
					<h4 className="font-semibold text-white">Ressources</h4>
					<ul className="mt-2 text-lg space-y-1">
						<li><a className="hover:underline" href="/">Accueil</a></li>
						<li><a className="hover:underline" href="/Chat">Chat</a></li>
                        <li><a className="hover:underline" href="/Profile">Profil</a></li>
					</ul>
				</div>

				<div>
					<h4 className="font-semibold text-white">Contact</h4>
					<p className="mt-2 text-lg">support@eduadapt.example</p>
					<p className="mt-1 text-lg">+33 1 23 45 67 89</p>
					<div className="mt-3 flex space-x-3">
						<a aria-label="Twitter" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 p-2" href="#"><Twitter /></a>
						<a aria-label="Facebook" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 p-2" href="#"><Facebook /></a>
						<a aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 p-2" href="#"> <Linkedin /></a>
					</div>
				</div>
			</div>

			<div className="border-t border-gray-800 mt-4">
				<div className="max-w-6xl mx-auto px-6 py-4 text-xs text-center text-gray-400">
					© 2025 EduAdapt — Tous droits réservés
				</div>
			</div>
		</footer>
	);
}

export default Footer;