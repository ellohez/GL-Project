import React from "react";

// TODO: Add a className prop for styling?
const Logo: React.FC = (): JSX.Element => {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
      width="40em"
      viewBox="0 0 800 270"
      role="img"
    >
      {/* The following should not be necessary as img is just text
          however, testing with VoiceOver shows that it is looking for a title */}
      <title>Global Logic - A Hitachi Group Company</title>
      <path d="M98.73,177.52h5.74L114,203h-5.81l-1.93-5.67H96.74l-2,5.67H89.08Zm-.53,15.61h6.59l-3.2-9.33h-.08Z" />
      <path d="M126.1,177.52h5.59v9.77H142v-9.77h5.6V203H142V192h-10.3v11H126.1Z" />
      <path d="M156.82,181.69h-5.07v-4.17h5.07Zm-5.07,2.85h5.07V203h-5.07Z" />
      <path d="M167.93,184.54h3.71v3.39h-3.71v9.12c0,1.71.43,2.14,2.14,2.14a7,7,0,0,0,1.57-.14V203a18.54,18.54,0,0,1-3,.18c-3.14,0-5.81-.67-5.81-4.38V187.93h-3.06v-3.39h3.06V179h5.06Z" />
      <path d="M174.56,190.21c.28-4.7,4.52-6.16,8.66-6.16,3.67,0,8.09.82,8.09,5.23v9.59A9.49,9.49,0,0,0,192,203h-5.13a7.71,7.71,0,0,1-.36-1.78,8.41,8.41,0,0,1-6.2,2.28c-3.53,0-6.27-1.75-6.27-5.53.07-8.37,12.47-3.88,12.26-8,0-2.14-1.5-2.5-3.28-2.5-2,0-3.17.79-3.35,2.78ZM186.25,194c-.86.75-2.64.79-4.21,1.07s-3,.86-3,2.71,1.46,2.35,3.1,2.35c4,0,4.1-3.1,4.1-4.24Z" />
      <path d="M207.41,191a3.38,3.38,0,0,0-3.74-3.17c-3.24,0-4.31,3.28-4.31,6s1,5.81,4.2,5.81c2.39,0,3.71-1.47,4-3.75h4.88c-.67,4.89-4,7.56-8.87,7.56-5.56,0-9.3-3.92-9.3-9.45,0-5.73,3.42-10,9.41-10,4.34,0,8.37,2.28,8.66,7Z" />
      <path d="M215.68,177.52h5.06v9.59h.11a6.38,6.38,0,0,1,5.38-3.06c5.38,0,6.73,3,6.73,7.59V203H227.9V192.56c0-3-.85-4.52-3.24-4.52-2.75,0-3.92,1.53-3.92,5.27V203h-5.06Z" />
      <path d="M241.65,181.69h-5.06v-4.17h5.06Zm-5.06,2.85h5.06V203h-5.06Z" />
      <path d="M273.05,200.08a8.57,8.57,0,0,1-7,3.5c-7.84,0-12.51-5.89-12.51-13.23,0-7.55,4.67-13.43,12.51-13.43,5.21,0,10.16,3.17,10.73,9h-5.34a5.19,5.19,0,0,0-5.39-4.28c-5,0-6.91,4.28-6.91,8.73,0,4.25,1.89,8.52,6.91,8.52,3.67,0,5.74-1.92,6.06-5.49h-5.63v-4.17h10.69V203h-3.56Z" />
      <path d="M281.17,184.54H286V188h.07a6.47,6.47,0,0,1,5.88-3.92,4.08,4.08,0,0,1,1.11.17v4.71a9,9,0,0,0-1.82-.18c-3.74,0-5,2.64-5,5.92V203h-5.06Z" />
      <path d="M303.26,184.05c5.81,0,9.55,3.84,9.55,9.72s-3.74,9.7-9.55,9.7-9.51-3.85-9.51-9.7S297.49,184.05,303.26,184.05Zm0,15.61c3.46,0,4.49-2.93,4.49-5.89s-1-5.91-4.49-5.91-4.45,3-4.45,5.91S299.84,199.66,303.26,199.66Z" />
      <path d="M332.3,203h-4.81V200.4h-.1a6.5,6.5,0,0,1-5.63,3.07c-5.39,0-6.74-3-6.74-7.59V184.54h5.06V195c0,3,.86,4.53,3.24,4.53,2.75,0,3.92-1.54,3.92-5.28v-9.66h5.06Z" />
      <path d="M335.44,184.54h4.81v2.36h.07a6.09,6.09,0,0,1,5.49-2.85c5.77,0,8.37,4.66,8.37,9.9,0,4.92-2.67,9.52-8.09,9.52a6.54,6.54,0,0,1-5.52-2.78h-.07v8.77h-5.06Zm13.68,9.27c0-3-1.17-5.95-4.42-5.95s-4.38,3-4.38,5.95,1.14,5.85,4.42,5.85S349.12,196.8,349.12,193.81Z" />
      <path d="M381.41,186.08a5.57,5.57,0,0,0-5.56-4.46c-5,0-6.92,4.28-6.92,8.73,0,4.25,1.89,8.52,6.92,8.52,3.42,0,5.34-2.32,5.77-5.7H387c-.57,6.38-4.92,10.41-11.19,10.41-7.85,0-12.51-5.89-12.51-13.23,0-7.55,4.66-13.43,12.51-13.43,5.56,0,10.29,3.28,11,9.16Z" />
      <path d="M398.54,184.05c5.81,0,9.55,3.84,9.55,9.72s-3.74,9.7-9.55,9.7-9.51-3.85-9.51-9.7S392.77,184.05,398.54,184.05Zm0,15.61c3.46,0,4.49-2.93,4.49-5.89s-1-5.91-4.49-5.91-4.45,3-4.45,5.91S395.12,199.66,398.54,199.66Z" />
      <path d="M409.37,184.54h4.78V187h.07a6.61,6.61,0,0,1,5.63-3c2.32,0,4.38.82,5.38,3.06a6.76,6.76,0,0,1,5.56-3.06c3.92,0,6.74,1.81,6.74,6.59V203h-5.06V192.53c0-2.46-.22-4.49-3.1-4.49s-3.39,2.38-3.39,4.67V203h-5.06V192.63c0-2.13.14-4.59-3.07-4.59-1,0-3.42.64-3.42,4.24V203h-5.06Z" />
      <path d="M440.44,184.54h4.81v2.36h.08a6.06,6.06,0,0,1,5.48-2.85c5.78,0,8.38,4.66,8.38,9.9,0,4.92-2.67,9.52-8.09,9.52a6.51,6.51,0,0,1-5.52-2.78h-.08v8.77h-5.06Zm13.69,9.27c0-3-1.18-5.95-4.42-5.95s-4.38,3-4.38,5.95,1.14,5.85,4.41,5.85S454.13,196.8,454.13,193.81Z" />
      <path d="M461.29,190.21c.28-4.7,4.52-6.16,8.66-6.16,3.67,0,8.09.82,8.09,5.23v9.59a9.49,9.49,0,0,0,.64,4.1h-5.13a7.71,7.71,0,0,1-.36-1.78,8.41,8.41,0,0,1-6.2,2.28c-3.53,0-6.27-1.75-6.27-5.53.07-8.37,12.47-3.88,12.26-8,0-2.14-1.5-2.5-3.28-2.5-2,0-3.17.79-3.35,2.78ZM473,194c-.86.75-2.64.79-4.21,1.07s-3,.86-3,2.71,1.46,2.35,3.1,2.35c4,0,4.1-3.1,4.1-4.24Z" />
      <path d="M481.24,184.54h4.81v2.57h.11a6.49,6.49,0,0,1,5.63-3.06c5.38,0,6.74,3,6.74,7.59V203h-5.06V192.56c0-3-.86-4.52-3.25-4.52-2.74,0-3.92,1.53-3.92,5.27V203h-5.06Z" />
      <path d="M510.75,205.29c-1.11,3-2.89,4.17-6.35,4.17-1,0-2.06-.08-3.1-.18v-4.17a20.73,20.73,0,0,0,3,.18,2.17,2.17,0,0,0,2-2.32,3.16,3.16,0,0,0-.21-1.14l-6.49-17.29h5.42l4.17,12.62h.07l4-12.62h5.24Z" />
      <path d="M129.83,114.66h28.61a31.29,31.29,0,1,1-1.18-20.37h8.49a39.26,39.26,0,1,0-37.42,51.17,38.81,38.81,0,0,0,30.6-15.18v13.49h7.27v-37H129.83Z" />
      <rect x="179.47" y="69.37" width="7.83" height="74.39" />
      <rect x="410.84" y="69.37" width="7.84" height="74.3" />
      <path d="M228.12,138.38c-12,0-21.81-10.34-21.81-22.35s9.77-22.29,21.81-22.29S249.93,104,249.93,116s-9.8,22.35-21.81,22.35m0-52.07A29.72,29.72,0,1,0,257.85,116a29.75,29.75,0,0,0-29.73-29.72" />
      <path d="M296.67,138.38c-12.05,0-21.82-10.34-21.82-22.35s9.77-22.29,21.82-22.29S318.46,104,318.46,116s-9.77,22.35-21.79,22.35M297,85.76a29.66,29.66,0,0,0-22.16,10V69.37H267v74.4h7.82v-7.48a29.65,29.65,0,0,0,22.16,10,30.26,30.26,0,0,0,0-60.51" />
      <path d="M367.37,138.35c-12,0-21.81-10.34-21.81-22.37s9.79-22.28,21.81-22.28S389.17,104,389.17,116s-9.76,22.37-21.8,22.37m21.86-42.49a30.26,30.26,0,1,0,0,40.32v7.59h7.92V89.29h-7.92Z" />
      <rect x="624.78" y="61.8" width="13.89" height="13.15" />
      <polygon points="446.61 69.37 433.88 69.37 433.88 131.75 433.88 143.7 475.56 143.7 475.56 131.75 446.61 131.75 446.61 69.37" />
      <rect x="624.78" y="85.21" width="13.89" height="58.38" />
      <path d="M510.82,133.56c-9.29,0-16.84-8.08-16.84-18s7.55-18,16.84-18,16.83,8.08,16.83,18-7.54,18-16.83,18m0-48.54a30.5,30.5,0,1,0,30.48,30.5A30.51,30.51,0,0,0,510.82,85" />
      <path d="M696.56,123.73a16.76,16.76,0,0,1-15.06,10c-9.29,0-16.83-8.11-16.83-18.07,0-10.88,7.54-18.06,16.83-18.06a16.71,16.71,0,0,1,14.65,9.11h14.54a30.56,30.56,0,1,0,.23,17Z" />
      <path d="M578.62,163.88a20,20,0,0,1-15.77-8.16l-12.33,6a32.32,32.32,0,0,0,28.1,15.19,31.26,31.26,0,0,0,30.89-28.45H595.57c-1.2,8.71-8.33,15.41-17,15.41" />
      <path d="M579.27,133.85c-9.25,0-16.76-8.08-16.76-18s7.51-18,16.76-18,16.8,8,16.8,18-7.52,18-16.8,18m17.84-42.56A30.36,30.36,0,1,0,609.65,116V85.26H597.11Z" />
      <path d="M722.61,75a8.24,8.24,0,1,1,8.25,8.36A8.18,8.18,0,0,1,722.61,75Zm15.2,0c0-4.21-2.94-7.3-6.95-7.3s-6.93,3.09-6.93,7.3a6.95,6.95,0,1,0,13.88,0Zm-10.22-4.55h4.15a2.6,2.6,0,0,1,2.87,2.52,2.09,2.09,0,0,1-1.8,2.14v0c1,.26,1.37.78,1.49,1.86.14,1.23.14,2.15.42,2.26v.15H733c-.26-.12-.29-1.06-.37-2.09a1.49,1.49,0,0,0-1.7-1.52h-1.6v3.61h-1.75Zm1.75,4h2c1,0,1.53-.51,1.53-1.28s-.5-1.26-1.5-1.26h-2Z" />
    </svg>
  );
};

export default Logo;
