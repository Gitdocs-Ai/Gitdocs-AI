import {
  ArrowRight,
  Check,
  FileCode,
  Globe,
  RotateCw,
  Zap,
  Bot,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Language interface
export interface Language {
  name: string; // Name of the language
  icon: React.ReactNode; // Supports any valid JSX/ReactNode
  color: string; // Text color for the language
  bgGradient: string; // Background gradient for the language
}

// AI Feature interface
export interface AIFeature {
  title: string; // Title of the AI feature
  description: string; // Description of the AI feature
  icon: React.ReactNode; // Supports any valid JSX/ReactNode
}

const SupportedTechnologies = () => {
  const [activeLanguageIndex, setActiveLanguageIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const languagesSectionRef = useRef<HTMLDivElement>(null);
  const featuresContainerRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = [
    {
      name: "JavaScript",
      icon: (
        <div
          className="w-12 h-12 flex items-center justify-center text-2xl font-bold"
          style={{ color: "#f7df1e" }}
        >
          JS
        </div>
      ),
      color: "#f7df1e",
      bgGradient:
        "linear-gradient(135deg, rgba(247, 223, 30, 0.15) 0%, rgba(247, 223, 30, 0.05) 100%)",
    },
    {
      name: "TypeScript",
      icon: (
        <div
          className="w-12 h-12 flex items-center justify-center text-2xl font-bold"
          style={{ color: "#3178c6" }}
        >
          TS
        </div>
      ),
      color: "#3178c6",
      bgGradient:
        "linear-gradient(135deg, rgba(49, 120, 198, 0.15) 0%, rgba(49, 120, 198, 0.05) 100%)",
    },
    {
      name: "Python",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 128 128" width="42" height="42">
            <linearGradient
              id="python-original-a"
              gradientUnits="userSpaceOnUse"
              x1="70.252"
              y1="1237.476"
              x2="170.659"
              y2="1151.089"
              gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"
            >
              <stop offset="0" stopColor="#5A9FD4"></stop>
              <stop offset="1" stopColor="#306998"></stop>
            </linearGradient>
            <linearGradient
              id="python-original-b"
              gradientUnits="userSpaceOnUse"
              x1="209.474"
              y1="1098.811"
              x2="173.62"
              y2="1149.537"
              gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"
            >
              <stop offset="0" stopColor="#FFD43B"></stop>
              <stop offset="1" stopColor="#FFE873"></stop>
            </linearGradient>
            <path
              fill="url(#python-original-a)"
              d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"
              transform="translate(0 10.26)"
            ></path>
            <path
              fill="url(#python-original-b)"
              d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"
              transform="translate(0 10.26)"
            ></path>
            <path
              opacity=".444"
              fill="url(#python-original-a)"
              d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"
              transform="translate(0 10.26)"
            ></path>
          </svg>
        </div>
      ),
      color: "#3776ab",
      bgGradient:
        "linear-gradient(135deg, rgba(55, 118, 171, 0.15) 0%, rgba(55, 118, 171, 0.05) 100%)",
    },
    {
      name: "Java",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 128 128" width="42" height="42">
            <path
              fill="#0074BD"
              d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"
            ></path>
            <path
              fill="#EA2D2E"
              d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"
            ></path>
            <path
              fill="#0074BD"
              d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"
            ></path>
            <path
              fill="#EA2D2E"
              d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"
            ></path>
            <path
              fill="#0074BD"
              d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"
            ></path>
          </svg>
        </div>
      ),
      color: "#007396",
      bgGradient:
        "linear-gradient(135deg, rgba(0, 115, 150, 0.15) 0%, rgba(0, 115, 150, 0.05) 100%)",
    },
    {
      name: "C#",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 128 128" width="42" height="42">
            <path
              fill="#68217A"
              d="M117.5 33.5l.3-.2c-.6-1.1-1.5-2.1-2.4-2.6L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-3.4 3.5-3.4 5.4v55.7c0 1.1.2 2.3.9 3.4l-.2.1c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 3.4-3.5 3.4-5.4V36.1c.1-.8 0-1.7-.4-2.6zM82 66v-4h5v-5h5v5h5v4h-5v5h-5v-5h-5zm3.3-14C81.1 44.5 73.1 39.5 64 39.5c-13.5 0-24.5 11-24.5 24.5s11 24.5 24.5 24.5c9.1 0 17.1-5 21.3-12.4l12.9 7.6c-6.8 11.8-19.6 19.8-34.2 19.8-21.8 0-39.5-17.7-39.5-39.5S42.2 24.5 64 24.5c14.7 0 27.5 8.1 34.3 20l-13 7.5z"
            ></path>
          </svg>
        </div>
      ),
      color: "#239120",
      bgGradient:
        "linear-gradient(135deg, rgba(35, 145, 32, 0.15) 0%, rgba(35, 145, 32, 0.05) 100%)",
    },
    {
      name: "Go",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 128 128" width="42" height="42">
            <path
              fill="#00acd7"
              d="M108.2 64.8c-.1-.1-.2-.2-.4-.2l-.1-.1c-.1-.1-.2-.1-.2-.2l-.1-.1c-.1 0-.2-.1-.2-.1l-.2-.1c-.1 0-.2-.1-.2-.1l-.2-.1c-.1 0-.2-.1-.2-.1-.1 0-.1 0-.2-.1l-.3-.1c-.1 0-.1 0-.2-.1l-.3-.1h-.1l-.4-.1h-.2c-.1 0-.2 0-.3-.1h-2.3c-.4 0-.8.1-1.1.2l-.5.2c-.1 0-.1 0-.2.1l-.3.2-.6.2-.3.2c-.2.1-.4.3-.6.5-.1 0-.1.1-.1.1l-.6.6-.2.2c-.2.2-.3.4-.5.7l-.1.1c-.1.2-.3.5-.4.7 0 .1-.1.1-.1.2l-.2.5c0 .1-.1.2-.1.3v.1c0 .2-.1.3-.1.5v4.3c0 .2 0 .3.1.5v.1c0 .1.1.2.1.3l.2.5c0 .1.1.1.1.2.1.2.2.5.4.7l.1.1c.2.3.3.5.5.7l.2.2c.2.2.4.4.6.6.1 0 .1.1.1.1.2.2.4.3.6.5l.3.2.6.3.3.1.5.2h.1c.3.1.7.2 1.1.2h2.3c.1 0 .2 0 .3-.1h.2l.4-.1h.1l.3-.1c.1 0 .1 0 .2-.1l.3-.1h.1c.1 0 .2-.1.2-.1l.2-.1c.1 0 .2-.1.2-.1l.2-.1c.1 0 .2-.1.2-.1l.2-.1.1-.1c.1-.1.2-.1.2-.2l.1-.1c.1-.1.2-.2.4-.2 3.7-3.8 3.7-10 .3-13.8zM90.6 70.7c.9 1.8 1.3 3.5 1.3 5.1 0 1.7-.5 3.1-1.5 4.5-.2-.2-.5-.5-.6-.7v-8.2c.2-.4.5-.6.8-.7z"
            ></path>
            <path
              fill="#00acd7"
              d="M94.7 78.3c.9-1.8 1.4-3.8 1.4-5.9 0-2.5-.6-4.9-1.8-7.1-2.3-4.2-6-7.9-10.5-10.3-18.5-10-33.3-3-42.6 6.1l-.2.2c-.1.1-.1.2-.2.2l-.1.1c-.1.1-.1.2-.2.2l-.1.1c-.1.1-.1.2-.2.2l-.1.1c-.1.1-.1.2-.2.2l-.1.1-.1.2-.1.1c-.1.1-.1.1-.1.2l-.1.1c-.1.1-.1.1-.1.2l-.1.1c0 .1-.1.1-.1.2V65l-.1.1c0 .1-.1.1-.1.2v.1c0 .1-.1.1-.1.2v.1c0 .1 0 .1-.1.2v.1c0 .1 0 .1-.1.2v.2c0 .1 0 .2-.1.2V67.1c0 .6-.1 1.2-.1 1.7v2.4C37 70.1 37 69 37.1 68v-1.8c0-.3 0-.6.1-.8v-.2c0-.1 0-.2.1-.3V65c0-.1 0-.2.1-.2V65c0-.1 0-.2.1-.2v-.1c0-.1.1-.2.1-.2v-.1c0-.1.1-.1.1-.2v-.1c0-.1.1-.1.1-.2l.1-.1.1-.1.1-.1c.1-.1.1-.1.1-.2l.1-.1c0-.1.1-.1.1-.2l.1-.1c.1-.1.1-.1.2-.2l.1-.1c.1-.1.1-.1.2-.2l.1-.1c.1-.1.1-.1.2-.2l.1-.1c.1-.1.1-.1.2-.2l.1-.1.2-.2.1-.1c.1-.1.2-.1.2-.2l.1-.1c.1-.1.2-.1.2-.2l.1-.1c.1-.1.2-.1.2-.2l.2-.1c.1-.1.2-.1.3-.2.1 0 .1-.1.2-.1.1-.1.2-.1.3-.2.1 0 .1-.1.2-.1.1-.1.2-.1.3-.2.1 0 .1-.1.2-.1.1-.1.2-.1.3-.1.1 0 .1-.1.2-.1s.2-.1.3-.1c.1 0 .1-.1.2-.1 1.9-.8 3.8-1.3 5.8-1.3 5.9 0 9.1 4 9.2 8v.1c0 .2 0 .3-.1.5v.2c0 .2 0 .4-.1.6V73.3c0 .2 0 .4.1.6v.2c0 .2 0 .3.1.5v.1c.7 4.1 5.5 7.1 5.7 7.2h.1c.9.5 3.2 1.4 6.5 1.4 5.2-.3 8.6-3.6 9.1-6.7 1 2 2.3 2.5 3.1 2.5h.2c1.5 0 2.4-1.3 2.4-1.4l.8-1.2c.3-.4.6-.9.8-1.5.1-.1.2-.2.2-.3z"
            ></path>
            <path
              fill="#f6fcfe"
              d="M45.9 57.3h.3c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-.3c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5zM89.2 50.7h.3c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-.3c-.8 0-1.5-.7-1.5-1.5.1-.8.7-1.5 1.5-1.5z"
            ></path>
            <path
              fill="#f6fcfe"
              d="M65.9 52.8l-6.3 1.7c-.1 0-.2.1-.2.1s-6.9 2.1-6.2 7.3c.6 5 4.3 5.5 4.3 5.5l.2-.5c-3.3-.6-3.9-4.4-3.9-4.5V62c.8-5.1 5.4-6.2 5.7-6.3h.1l6.5-1.7c.1-.1-.2-1.2-.2-1.2z"
            ></path>
            <path
              fill="#f6fcfe"
              d="M63.5 51.7L56.5 54c-.6.1-3.5.8-5.5 3.8-.4.6-1.2 1.7-1.7 3.8-.3 1-.4 2-.4 3 0 .3 0 .5.1.8.5 4.2 3.7 5.1 3.7 5.1l.2-.5c-2.7-.6-3.3-4.3-3.3-4.4v-.3c.5-6 5.5-7.9 5.8-8l7.1-2.4s-.1-.7-.4-1.3c-.3-.4-.8-.9-1.1-1.2-.3-.3.3-.7.3-.7z"
            ></path>
            <path
              fill="#f6fcfe"
              d="M73.3 67c-.6 0-1.1.5-1.1 1.1 0 .7.5 1.2 1.1 1.2.7 0 1.2-.5 1.2-1.2 0-.6-.5-1.1-1.2-1.1z"
            ></path>
            <path
              fill="#00acd7"
              d="M113.3 25.5c-1.5-1.8-4.2-2-6.3-.7-2.3 1.5-3 4.5-1.5 6.8 1 1.6 2.9 2.3 4.6 2 .3 0 .5 0 .8-.1 2.3-.4 4.1-2.3 4.1-4.7 0-1.2-.6-2.4-1.7-3.3zM99.5 31c-2.7-2-6.5-1.8-8.9.3-2.3 2-2.8 5.5-1.1 8 1.5 2.3 4.3 3.2 6.8 2.4.3-.1.7-.2 1-.4 2.5-1 4.1-3.6 3.7-6.3-.2-1.5-1-3.1-1.5-4zM82.9 41.5c-4.3-1.4-9 .7-10.5 4.9-1.4 3.8.2 8.1 3.7 10 3.1 1.6 6.8 1 9.3-1.3.2-.2.4-.4.5-.5 2.3-2.2 3.1-5.8 1.8-8.8-.6-1.7-2.7-3.5-4.8-4.3zM65.3 58.3c-1.1-.3-2.3-.5-3.5-.5-3.4 0-6.5 1.5-8.5 4.1-1.6 2-2.4 4.6-2.1 7.1.5 3.9 3.5 7.3 7.5 8.1.3.1.7.1 1 .1 3.5 0 6.5-1.9 8.1-4.8 1.8-3.3 1.4-7.5-1-10.4-.3-.3-.9-1.4-1.5-3.7z"
            ></path>
          </svg>
        </div>
      ),
      color: "#00add8",
      bgGradient:
        "linear-gradient(135deg, rgba(0, 173, 216, 0.15) 0%, rgba(0, 173, 216, 0.05) 100%)",
    },
    {
      name: "Ruby",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 128 128" width="42" height="42">
            <linearGradient
              id="ruby-original-a"
              gradientUnits="userSpaceOnUse"
              x1="157.08"
              y1="2382.05"
              x2="131.682"
              y2="2426.892"
              gradientTransform="matrix(1 0 0 -1 -47.5 2517)"
            >
              <stop offset="0" stopColor="#FB7655"></stop>
              <stop offset="0" stopColor="#FB7655"></stop>
              <stop offset=".41" stopColor="#E42B1E"></stop>
              <stop offset=".99" stopColor="#900"></stop>
              <stop offset="1" stopColor="#900"></stop>
            </linearGradient>
            <path
              fill="url(#ruby-original-a)"
              d="M97.078 83.214L28.34 124.031l89.003-6.04 6.855-89.745z"
            ></path>
            <linearGradient
              id="ruby-original-b"
              gradientUnits="userSpaceOnUse"
              x1="169.731"
              y1="2419.72"
              x2="136.998"
              y2="2441.685"
              gradientTransform="matrix(1 0 0 -1 -47.5 2517)"
            >
              <stop offset="0" stopColor="#871101"></stop>
              <stop offset="0" stopColor="#871101"></stop>
              <stop offset=".99" stopColor="#911209"></stop>
              <stop offset="1" stopColor="#911209"></stop>
            </linearGradient>
            <path
              fill="url(#ruby-original-b)"
              d="M117.488 117.93l-7.649-52.799-20.837 27.514z"
            ></path>
            <linearGradient
              id="ruby-original-c"
              gradientUnits="userSpaceOnUse"
              x1="143.542"
              y1="2380.69"
              x2="110.81"
              y2="2402.655"
              gradientTransform="matrix(1 0 0 -1 -47.5 2517)"
            >
              <stop offset="0" stopColor="#871101"></stop>
              <stop offset="0" stopColor="#871101"></stop>
              <stop offset=".99" stopColor="#911209"></stop>
              <stop offset="1" stopColor="#911209"></stop>
            </linearGradient>
            <path
              fill="url(#ruby-original-c)"
              d="M117.592 117.93l-56.044-4.399-32.91 10.385z"
            ></path>
            <linearGradient
              id="ruby-original-d"
              gradientUnits="userSpaceOnUse"
              x1="74.817"
              y1="2435.622"
              x2="79.891"
              y2="2402.644"
              gradientTransform="matrix(1 0 0 -1 -47.5 2517)"
            >
              <stop offset="0" stopColor="#fff"></stop>
              <stop offset="0" stopColor="#fff"></stop>
              <stop offset=".23" stopColor="#E57252"></stop>
              <stop offset=".46" stopColor="#DE3B20"></stop>
              <stop offset=".99" stopColor="#A60003"></stop>
              <stop offset="1" stopColor="#A60003"></stop>
            </linearGradient>
            <path
              fill="url(#ruby-original-d)"
              d="M28.717 123.928l14.001-45.867-30.81 6.588z"
            ></path>
            <linearGradient
              id="ruby-original-e"
              gradientUnits="userSpaceOnUse"
              x1="109.719"
              y1="2466.413"
              x2="111.589"
              y2="2432.757"
              gradientTransform="matrix(1 0 0 -1 -47.5 2517)"
            >
              <stop offset="0" stopColor="#fff"></stop>
              <stop offset="0" stopColor="#fff"></stop>
              <stop offset=".23" stopColor="#E4714E"></stop>
              <stop offset=".56" stopColor="#BE1A0D"></stop>
              <stop offset=".99" stopColor="#A80D00"></stop>
              <stop offset="1" stopColor="#A80D00"></stop>
            </linearGradient>
            <path
              fill="url(#ruby-original-e)"
              d="M88.996 92.797l-12.882-50.46-36.866 34.558z"
            ></path>
            <linearGradient
              id="ruby-original-f"
              gradientUnits="userSpaceOnUse"
              x1="140.691"
              y1="2497.523"
              x2="146.289"
              y2="2473.401"
              gradientTransform="matrix(1 0 0 -1 -47.5 2517)"
            >
              <stop offset="0" stopColor="#fff"></stop>
              <stop offset="0" stopColor="#fff"></stop>
              <stop offset=".18" stopColor="#E46342"></stop>
              <stop offset=".4" stopColor="#C82410"></stop>
              <stop offset=".99" stopColor="#A80D00"></stop>
              <stop offset="1" stopColor="#A80D00"></stop>
            </linearGradient>
            <path
              fill="url(#ruby-original-f)"
              d="M121.275 43.047L86.473 14.585l2.27 28.672z"
            ></path>
            <linearGradient
              id="ruby-original-g"
              gradientUnits="userSpaceOnUse"
              x1="123.6"
              y1="2506.018"
              x2="147.719"
              y2="2518.077"
              gradientTransform="matrix(1 0 0 -1 -47.5 2517)"
            >
              <stop offset="0" stopColor="#fff"></stop>
              <stop offset="0" stopColor="#fff"></stop>
              <stop offset=".54" stopColor="#C81F11"></stop>
              <stop offset=".99" stopColor="#BF0905"></stop>
              <stop offset="1" stopColor="#BF0905"></stop>
            </linearGradient>
            <path
              fill="url(#ruby-original-g)"
              d="M104.978 4.437L84.481 15.764 71.551 4.285z"
            ></path>
            <linearGradient
              id="ruby-original-h"
              gradientUnits="userSpaceOnUse"
              x1="53.674"
              y1="2444.028"
              x2="55.66"
              y2="2424.153"
              gradientTransform="matrix(1 0 0 -1 -47.5 2517)"
            >
              <stop offset="0" stopColor="#fff"></stop>
              <stop offset="0" stopColor="#fff"></stop>
              <stop offset=".31" stopColor="#DE4024"></stop>
              <stop offset=".99" stopColor="#BF190B"></stop>
              <stop offset="1" stopColor="#BF190B"></stop>
            </linearGradient>
            <path
              fill="url(#ruby-original-h)"
              d="M3.802 100.034l8.586-15.659L5.442 65.54z"
            ></path>
            <path
              fill="#fff"
              d="M4.981 65.523l6.987 19.135 13.274-6.12-12.996-7.108-7.265-5.907zm36.752 12.563L29.211 93.868l26.066-4.234 39.649 3.914 12.799-28.283-.577 28.913 9.596-65.348L88.22 63.52l-41.932-10.886-4.555 25.452zm37.342-56.091L41.808 41.788l14.928 32.59 43.011-10.047-20.672-42.336z"
            ></path>
            <linearGradient
              id="ruby-original-i"
              gradientUnits="userSpaceOnUse"
              x1="121.858"
              y1="2494.873"
              x2="136.252"
              y2="2510.513"
              gradientTransform="matrix(1 0 0 -1 -47.5 2517)"
            >
              <stop offset="0" stopColor="#BD0012"></stop>
              <stop offset="0" stopColor="#BD0012"></stop>
              <stop offset=".07" stopColor="#fff"></stop>
              <stop offset=".17" stopColor="#fff"></stop>
              <stop offset=".27" stopColor="#C82F1C"></stop>
              <stop offset=".33" stopColor="#820C01"></stop>
              <stop offset=".46" stopColor="#A31601"></stop>
              <stop offset=".72" stopColor="#B31301"></stop>
              <stop offset=".99" stopColor="#E82609"></stop>
              <stop offset="1" stopColor="#E82609"></stop>
            </linearGradient>
            <path
              fill="url(#ruby-original-i)"
              d="M39.363 22.161c24.483-24.344 55.832-24.256 56.64-24.468l-4.035-2.795c-17.533.7-34.734 6.777-46.76 18.625-8.02 7.884-15.616 14.892-25.443 21.556l-9.809-3.076c12.328-7.831 19.096-10.83 29.407-9.842z"
            ></path>
            <linearGradient
              id="ruby-original-j"
              gradientUnits="userSpaceOnUse"
              x1="111.505"
              y1="2409.183"
              x2="83.398"
              y2="2416.029"
              gradientTransform="matrix(1 0 0 -1 -47.5 2517)"
            >
              <stop offset="0" stopColor="#8C0C01"></stop>
              <stop offset="0" stopColor="#8C0C01"></stop>
              <stop offset=".54" stopColor="#990C00"></stop>
              <stop offset=".99" stopColor="#A80D0E"></stop>
              <stop offset="1" stopColor="#A80D0E"></stop>
            </linearGradient>
            <path
              fill="url(#ruby-original-j)"
              d="M28.717 123.909l13.859-46.013L90.207 93.48c-18.096 15.801-35.346 23.8-61.49 30.429z"
            ></path>
            <linearGradient
              id="ruby-original-k"
              gradientUnits="userSpaceOnUse"
              x1="160.348"
              y1="2407.557"
              x2="106.451"
              y2="2420.202"
              gradientTransform="matrix(1 0 0 -1 -47.5 2517)"
            >
              <stop offset="0" stopColor="#7E110B"></stop>
              <stop offset="0" stopColor="#7E110B"></stop>
              <stop offset=".99" stopColor="#9E0C00"></stop>
              <stop offset="1" stopColor="#9E0C00"></stop>
            </linearGradient>
            <path
              fill="url(#ruby-original-k)"
              d="M77.062 45.831l13.364 47.587c15.823-16.36 25.418-33.062 31.644-50.475L90.425 12.798 77.062 45.831z"
            ></path>
            <linearGradient
              id="ruby-original-l"
              gradientUnits="userSpaceOnUse"
              x1="93.232"
              y1="2419.889"
              x2="123.6"
              y2="2380.263"
              gradientTransform="matrix(1 0 0 -1 -47.5 2517)"
            >
              <stop offset="0" stopColor="#79130D"></stop>
              <stop offset="0" stopColor="#79130D"></stop>
              <stop offset=".99" stopColor="#9E120B"></stop>
              <stop offset="1" stopColor="#9E120B"></stop>
            </linearGradient>
            <path
              fill="url(#ruby-original-l)"
              d="M122.069 43.049c5.297-13.922 7.285-36.915-17.03-38.601l-14.569 8.35 31.599 30.251z"
            ></path>
            <linearGradient
              id="ruby-original-m"
              gradientUnits="userSpaceOnUse"
              x1="66.384"
              y1="2393.295"
              x2="95.383"
              y2="2427.511"
              gradientTransform="matrix(1 0 0 -1 -47.5 2517)"
            >
              <stop offset="0" stopColor="#8B2114"></stop>
              <stop offset="0" stopColor="#8B2114"></stop>
              <stop offset=".43" stopColor="#9E100A"></stop>
              <stop offset=".99" stopColor="#B3100C"></stop>
              <stop offset="1" stopColor="#B3100C"></stop>
            </linearGradient>
            <path
              fill="url(#ruby-original-m)"
              d="M38.705 78.419l13.146 44.399c12.645-6.566 23.579-14.611 32.774-24.113L38.705 78.419z"
            ></path>
            <linearGradient
              id="ruby-original-n"
              gradientUnits="userSpaceOnUse"
              x1="146.333"
              y1="2484.388"
              x2="147.75"
              y2="2451.062"
              gradientTransform="matrix(1 0 0 -1 -47.5 2517)"
            >
              <stop offset="0" stopColor="#B31000"></stop>
              <stop offset="0" stopColor="#B31000"></stop>
              <stop offset=".44" stopColor="#910F08"></stop>
              <stop offset=".99" stopColor="#791C12"></stop>
              <stop offset="1" stopColor="#791C12"></stop>
            </linearGradient>
            <path
              fill="url(#ruby-original-n)"
              d="M122.124 42.898L90.477 63.631 121.896 94.23c5.427-14.746 8.365-30.833.228-51.332z"
            ></path>
          </svg>
        </div>
      ),
      color: "#cc342d",
      bgGradient:
        "linear-gradient(135deg, rgba(204, 52, 45, 0.15) 0%, rgba(204, 52, 45, 0.05) 100%)",
    },
    {
      name: "PHP",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 128 128" width="42" height="42">
            <path
              fill="#6181B6"
              d="M64 33.039c-33.74 0-61.094 13.862-61.094 30.961s27.354 30.961 61.094 30.961 61.094-13.862 61.094-30.961S97.74 33.039 64 33.039zm-15.897 36.993c-1.458 1.364-3.077 1.927-4.86 2.507-1.783.581-4.052.461-6.811.461h-6.253l-1.733 10h-7.301l6.515-34H41.7c4.224 0 7.305 1.215 9.242 3.432 1.937 2.217 2.519 5.364 1.747 9.337-.319 1.637-.856 3.159-1.614 4.515a15.118 15.118 0 01-2.972 3.748zm31.882-4.837c-.819 4.194-2.541 7.269-5.63 9.934-3.088 2.664-6.6 3.997-10.535 3.997-4.734 0-8.035-1.766-9.896-5.297-1.861-3.533-2.038-8.032-.529-13.5.863-4.401 2.541-7.458 5.037-9.17 2.495-1.711 6.088-2.567 10.78-2.567 4.319 0 7.585 1.407 9.8 4.22 2.222 2.562 2.709 6.325 1.478 11.292l-.535 1.091zm31.747 5.297l-2.742 14h-7.762l2.743-14h-5.978l2.743-14h5.978l.708-3.6h5.723l-.708 3.6h6.54l-2.344 12h-6.54l-.342 2h-8.907l2.344-12h5.978l.342-2h8.907l-.342 2h5.723l-1.737 10h-6.246z"
            ></path>
            <path
              fill="#fff"
              d="M38.496 50.167h-8.124l-3.91 20h4.062c2.423 0 4.359-.15 5.81-.453 1.449-.301 2.818-.962 4.105-1.979 1.286-1.018 2.312-2.17 3.075-3.459.762-1.29 1.31-2.731 1.642-4.328.513-2.621.316-4.767-.591-6.439-.908-1.67-2.735-3.006-5.485-4.007a22.8 22.8 0 00-1.506-.427c.065-.323.119-.562.16-.716.159-.632.303-1.032.435-1.201.132-.169.352-.254.662-.254h3.4l.693-3h-4.428zm-4.825 4h2.55c1.967 0 3.363.451 4.187 1.353.825.902 1.054 2.522.686 4.858-.263 1.341-.67 2.409-1.223 3.201-.552.793-1.283 1.379-2.193 1.76-.91.381-2.075.571-3.497.571h-2.302l1.792-11.743zm27.376.62c-1.593-.2-2.969-.3-4.129-.3-2.773 0-5.015.478-6.729 1.434-1.714.957-2.969 2.451-3.766 4.481-.797 2.03-1.195 4.407-1.196 7.13 0 2.298.432 4.247 1.295 5.844.863 1.597 2.178 2.786 3.947 3.566 1.769.779 4.033 1.169 6.792 1.169 1.873 0 3.768-.137 5.685-.41l1.593-8.172c-.98.399-1.908.685-2.784.86-.877.174-1.618.26-2.226.26-2.257 0-3.898-.607-4.924-1.822-1.027-1.215-1.54-2.97-1.54-5.266 0-2.309.512-4.082 1.536-5.327 1.023-1.244 2.578-1.867 4.665-1.867.659 0 1.348.09 2.068.272.719.18 1.737.528 3.055 1.042l1.658-8.568zm11.688 4.044h-8.309l-1.659 8.765h8.165L71.376 71.372h-8.308l-.823 4.222H54.12l5.086-26.357h18.683l-1.363 7h-8.31l-.647 3.594zM41.528 72.756h-8.308l-1.659 8.766h8.164l-.5 3.756h-8.309l-.822 4.222h-8.125l5.086-26.357h18.683l-1.363 7h-8.309l-.648 3.613z"
            ></path>
          </svg>
        </div>
      ),
      color: "#777bb4",
      bgGradient:
        "linear-gradient(135deg, rgba(119, 123, 180, 0.15) 0%, rgba(119, 123, 180, 0.05) 100%)",
    },
    {
      name: "Swift",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 128 128" width="42" height="42">
            <path
              fill="#F05138"
              d="M126.33,34.06a39.32,39.32,0,0,0-.79-7.83,28.78,28.78,0,0,0-2.65-7.58,28.84,28.84,0,0,0-4.76-6.32,23.42,23.42,0,0,0-6.62-4.55,27.27,27.27,0,0,0-7.68-2.53c-2.65-.51-5.56-.51-8.21-.76H30.25A45.46,45.46,0,0,0,24.16,5a21.82,21.82,0,0,0-5.82,1.52c-.53.25-1.32.51-1.85.76a33.82,33.82,0,0,0-5,3.28c-.53.51-1.06.76-1.59,1.26a22.41,22.41,0,0,0-4.76,6.32,23.61,23.61,0,0,0-2.65,7.58,78.5,78.5,0,0,0-.79,7.83V93.94a39.32,39.32,0,0,0,.79,7.83,28.78,28.78,0,0,0,2.65,7.58,28.84,28.84,0,0,0,4.76,6.32,23.42,23.42,0,0,0,6.62,4.55,27.27,27.27,0,0,0,7.68,2.53c2.65.51,5.56.51,8.21.76H95.63a45.08,45.08,0,0,0,8.21-.76,27.27,27.27,0,0,0,7.68-2.53,30.13,30.13,0,0,0,6.62-4.55,22.41,22.41,0,0,0,4.76-6.32,23.61,23.61,0,0,0,2.65-7.58,78.49,78.49,0,0,0,.79-7.83V34.06Z"
            ></path>
            <path
              fill="#FFF"
              d="M85,96.5c-11.11,6.13-26.38,6.76-41.75.47A64.53,64.53,0,0,1,13.84,73a50,50,0,0,0,10.85,13.34c22.09,21.5,58.2,16.85,83.66-6.92a51.6,51.6,0,0,0,5.92-6.92A49.47,49.47,0,0,1,85,96.5Z"
            ></path>
            <path
              fill="#FFF"
              d="M95.63,71c-18.92,24.29-45.33,36-73.79,22.53,19.16,15.76,43.4,11.41,62.19-7.07,12.28-12.25,17.44-24.53,15.13-35.89A22,22,0,0,1,95.63,71Z"
            ></path>
          </svg>
        </div>
      ),
      color: "#fa7343",
      bgGradient:
        "linear-gradient(135deg, rgba(250, 115, 67, 0.15) 0%, rgba(250, 115, 67, 0.05) 100%)",
    },
    {
      name: "Kotlin",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 128 128" width="42" height="42">
            <linearGradient
              id="kotlin-original-a"
              gradientUnits="userSpaceOnUse"
              x1="-4.046"
              y1="63.588"
              x2="66.071"
              y2="118.902"
            >
              <stop offset="0" stopColor="#1C93C1"></stop>
              <stop offset=".163" stopColor="#2391C0"></stop>
              <stop offset=".404" stopColor="#378BBE"></stop>
              <stop offset=".696" stopColor="#587EB9"></stop>
              <stop offset=".995" stopColor="#7F6CB1"></stop>
            </linearGradient>
            <path fill="url(#kotlin-original-a)" d="M0 0h65.4L0 64.4z"></path>
            <linearGradient
              id="kotlin-original-b"
              gradientUnits="userSpaceOnUse"
              x1="2.661"
              y1="125.921"
              x2="66.884"
              y2="67.99"
            >
              <stop offset="0" stopColor="#C757A7"></stop>
              <stop offset=".046" stopColor="#CA5A9E"></stop>
              <stop offset=".241" stopColor="#D66779"></stop>
              <stop offset=".428" stopColor="#E17357"></stop>
              <stop offset=".6" stopColor="#E97C3A"></stop>
              <stop offset=".756" stopColor="#EF8324"></stop>
              <stop offset=".888" stopColor="#F28817"></stop>
              <stop offset=".982" stopColor="#F48912"></stop>
            </linearGradient>
            <path
              fill="url(#kotlin-original-b)"
              d="M128 128L64.6 62.6 0 128z"
            ></path>
            <linearGradient
              id="kotlin-original-c"
              gradientUnits="userSpaceOnUse"
              x1="37.738"
              y1="149.191"
              x2="96.47"
              y2="8.828"
            >
              <stop offset="0" stopColor="#1C93C1"></stop>
              <stop offset=".216" stopColor="#2D8EBB"></stop>
              <stop offset=".64" stopColor="#587EB9"></stop>
              <stop offset=".995" stopColor="#7F6CB1"></stop>
            </linearGradient>
            <path
              fill="url(#kotlin-original-c)"
              d="M0 128L128 0H64.6L0 63.7z"
            ></path>
          </svg>
        </div>
      ),
      color: "#7f52ff",
      bgGradient:
        "linear-gradient(135deg, rgba(127, 82, 255, 0.15) 0%, rgba(127, 82, 255, 0.05) 100%)",
    },
  ];

  const aiFeatures: AIFeature[] = [];

  // Auto-rotate through languages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLanguageIndex((prev) => (prev + 1) % languages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [languages.length]);

  // Intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (languagesSectionRef.current) {
      observer.observe(languagesSectionRef.current);
    }

    return () => {
      if (languagesSectionRef.current) {
        observer.unobserve(languagesSectionRef.current);
      }
    };
  }, []);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gitdocs-blue/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-gitdocs-purple/5 to-transparent"></div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gitdocs-blue/5 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-gitdocs-purple/5 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-gitdocs-orange/5 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 mb-4 border border-gitdocs-orange/30 rounded-full bg-gitdocs-orange/5 text-gitdocs-orange text-xs font-medium">
            Smart Technology
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Powered by{" "}
            <span className="text-gitdocs-purple relative">
              Codebase-Aware
              <svg
                className="absolute -bottom-1.5 left-0 w-full"
                viewBox="0 0 300 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5C32 2.5 62.5 8 93.5 9.5C124.5 11 156 6.5 187 4.5C218 2.5 249 5.5 280 8.5C311 11.5 330.5 5.83333 342 3"
                  stroke="currentColor"
                  strokeOpacity="0.35"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>{" "}
            AI
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            GitDocs AI understands your code at a deep level, supporting
            multiple languages and frameworks to generate accurate, contextually
            relevant documentation.
          </p>
        </div>

        {/* Language Support Section with Animation */}
        <div
          ref={languagesSectionRef}
          className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-gitdocs-blue/10 via-gitdocs-purple/5 to-gitdocs-orange/10 rounded-full blur-3xl opacity-30" />
          </div>

          <h3 className="text-2xl font-semibold text-center mb-12">
            Supporting All Major Programming Languages
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {languages.map((lang, index) => (
              <div
                key={lang.name}
                className={`flex flex-col items-center transition-all duration-500 rounded-xl ${
                  index === activeLanguageIndex
                    ? "bg-white scale-110 shadow-xl z-10 transform-gpu animate-pulse-subtle"
                    : "bg-white/80 hover:bg-white hover:shadow-lg hover:scale-105"
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  boxShadow:
                    index === activeLanguageIndex
                      ? `0 10px 25px -5px ${lang.color}40, 0 8px 10px -6px ${lang.color}30`
                      : "",
                }}
              >
                <div
                  className={`w-full p-6 rounded-t-xl flex items-center justify-center transition-colors duration-500`}
                  style={{
                    background:
                      index === activeLanguageIndex
                        ? lang.bgGradient
                        : "linear-gradient(135deg, rgba(249, 250, 251, 0.8) 0%, rgba(240, 240, 240, 0.4) 100%)",
                  }}
                >
                  {lang.icon}
                </div>
                <div className="p-4 text-center">
                  <span
                    className={`font-medium text-lg transition-colors duration-300 ${
                      index === activeLanguageIndex
                        ? "text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    {lang.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 text-muted-foreground">
            <p>And many more languages and frameworks...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportedTechnologies;
