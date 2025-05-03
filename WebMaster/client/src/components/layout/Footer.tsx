import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-sans">NextGen Study Hub</h3>
            <p className="text-gray-400 mb-4">Transforming education with advanced technology and collaborative tools.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="ri-linkedin-box-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="ri-github-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="ri-youtube-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 font-sans">Features</h3>
            <ul className="space-y-2">
              <li><Link href="/innovation-lab"><a className="text-gray-400 hover:text-white transition-colors">Innovation Lab</a></Link></li>
              <li><Link href="/virtual-labs"><a className="text-gray-400 hover:text-white transition-colors">Virtual Labs</a></Link></li>
              <li><Link href="/ai-tools"><a className="text-gray-400 hover:text-white transition-colors">AI Tools</a></Link></li>
              <li><Link href="/quantum-computing"><a className="text-gray-400 hover:text-white transition-colors">Quantum Computing</a></Link></li>
              <li><Link href="/collaboration"><a className="text-gray-400 hover:text-white transition-colors">Collaboration</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 font-sans">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community Forum</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 font-sans">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="ri-mail-line mr-2 text-gray-400"></i>
                <a href="mailto:info@nextgenstudyhub.com" className="text-gray-400 hover:text-white transition-colors">info@nextgenstudyhub.com</a>
              </li>
              <li className="flex items-center">
                <i className="ri-phone-line mr-2 text-gray-400"></i>
                <a href="tel:+917999916500" className="text-gray-400 hover:text-white transition-colors">+91 7999916500</a>
              </li>
              <li className="flex items-center">
                <i className="ri-map-pin-line mr-2 text-gray-400"></i>
                <span className="text-gray-400">Himanshu Kushwaha</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm mb-2 md:mb-0">© 2023 NextGen Study Hub. All rights reserved.</p>
            <p className="text-gray-600 text-xs italic">Psst! Try pressing 'S', 'N', 'K' in sequence for a surprise...</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
