import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h5 className="font-bold mb-4">Learn-Up for Business</h5>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Teach on Learn-Up
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Get the app
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                About us
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Contact us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-4">Resources</h5>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Help and Support
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Affiliate
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-4">Teach</h5>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Teach on Ddemy
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Instructor Resources
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Get the app
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                About us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-4">Support</h5>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Help and Support
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Trust and Safety
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Terms
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <p>&copy; {new Date().getFullYear()} Learn-Up, Inc.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            Facebook
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Twitter
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            LinkedIn
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
