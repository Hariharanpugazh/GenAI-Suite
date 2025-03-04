"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import ihubLogo from "@/assets/ihub.png";

const Circle = forwardRef<
    HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex w-25 h-10 items-center justify-center rounded-full bg-white p-3 ",
        className,
      )}
    >
      {children}
    </div>
  );
});



export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);
  const div9Ref = useRef<HTMLDivElement>(null);
  const div10Ref = useRef<HTMLDivElement>(null);
  const div11Ref = useRef<HTMLDivElement>(null);
  const div12Ref = useRef<HTMLDivElement>(null);
  const div13Ref = useRef<HTMLDivElement>(null);
  const div14Ref = useRef<HTMLDivElement>(null);
  const div15Ref = useRef<HTMLDivElement>(null);


  return (
    <div
      className="relative flex h-[1000px]   justify-center overflow-hidden p-10 "
      ref={containerRef}
    >
      <div className="flex w-full flex-col max-h-[200px] items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <Ihub.smartcity />
          </Circle>
          <Circle ref={div9Ref}>
            <Ihub.robotics />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <Ihub.healthcare />
          </Circle>
          <Circle ref={div10Ref}>
            <Ihub.meta />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <Ihub.agri />
          </Circle>
          <Circle ref={div11Ref}>
            <Ihub.ds />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div4Ref}>
            <Ihub.automobile />
          </Circle>
          <Circle ref={div8Ref}>
            <Ihub.logo />
          </Circle>
          <Circle ref={div12Ref}>
            <Ihub.iot />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div5Ref}>
            <Ihub.aerospace />
          </Circle>
          <Circle ref={div13Ref}>
            <Ihub.communication />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div6Ref}>
            <Ihub.retail />
          </Circle>
          <Circle ref={div14Ref}>
            <Ihub.printing />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div7Ref}>
            <Ihub.power />
          </Circle>
          <Circle ref={div15Ref}>
            <Ihub.lowcode />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div8Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div8Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div8Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div8Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div8Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div8Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div8Ref}
      />
      <AnimatedBeam
  containerRef={containerRef}
  fromRef={div9Ref}
  toRef={div8Ref}
  reverse={true}
/>
<AnimatedBeam
  containerRef={containerRef}
  fromRef={div10Ref}
  toRef={div8Ref}
  reverse={true}
/>
<AnimatedBeam
  containerRef={containerRef}
  fromRef={div11Ref}
  toRef={div8Ref}
  reverse={true}
/>
<AnimatedBeam
  containerRef={containerRef}
  fromRef={div12Ref}
  toRef={div8Ref}
  reverse={true}
/>
<AnimatedBeam
  containerRef={containerRef}
  fromRef={div13Ref}
  toRef={div8Ref}
  reverse={true}
/>
<AnimatedBeam
  containerRef={containerRef}
  fromRef={div14Ref}
  toRef={div8Ref}
  reverse={true}
/>
<AnimatedBeam
  containerRef={containerRef}
  fromRef={div15Ref}
  toRef={div8Ref}
  reverse={true}
/>
</div>
    
  );
}

const Ihub = {
    logo: () => (
        <div
  className="bg-white text-black text-lg font-semibold px-4 py-2 rounded-full my-2 w-20 h-20 flex items-center justify-center"
  style={{
    position: 'relative',
  }}
>
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '120%',
      height: '120%',
      background: 'linear-gradient(to right, rgba(51, 6, 178, 0.2), rgba(88, 18, 198, 0.2), rgba(143, 24, 201, 0.2), rgba(195, 36, 101, 0.2), rgba(225, 38, 23, 0.2), rgba(230, 87, 8, 0.2), rgba(188, 178, 1, 0.2), rgba(19, 164, 21, 0.2), rgba(37, 164, 72, 0.2))',
      filter: 'blur(5px)',
      zIndex: '-1',
      borderRadius: '50%',
    }}
  ></div>
  <img
    src={ihubLogo}
    alt="ihub logo"
    className="h-14 w-14 object-contain flex-shrink-0"
  />
</div>

    ),
    robotics: () => (
        <div
          className="border text-black text-lg font-semibold px-4 py-2 rounded-none my-2 w-80 h-13 flex items-center justify-center"
          style={{
            boxShadow: '0px 12px 80px 0px rgba(0, 0, 0, 0.04), 0px 5.013px 33.422px 0px rgba(0, 0, 0, 0.06), 0px 2.68px 17.869px 0px rgba(0, 0, 0, 0.07), 0px 1.503px 10.017px 0px rgba(0, 0, 0, 0.08), 0px 0.798px 5.32px 0px rgba(0, 0, 0, 0.10), 0px 0.332px 2.214px 0px rgba(0, 0, 0, 0.14)',
            transition: 'border 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderImage = 'linear-gradient(to right, #3306B2, #5812C6, #8F18C9, #C32465, #E12617, #E65708, #BCB201, #13A415, #25A448) 1')}
          onMouseOut={(e) => (e.currentTarget.style.borderImage = '')}
        >
          Robotics & Automation
        </div>
      ),
      meta: () => (
        <div
          className="border text-black text-lg font-semibold px-4 py-2 rounded-none my-2 w-80 h-13 flex items-center justify-center"
          style={{
            boxShadow: '0px 12px 80px 0px rgba(0, 0, 0, 0.04), 0px 5.013px 33.422px 0px rgba(0, 0, 0, 0.06), 0px 2.68px 17.869px 0px rgba(0, 0, 0, 0.07), 0px 1.503px 10.017px 0px rgba(0, 0, 0, 0.08), 0px 0.798px 5.32px 0px rgba(0, 0, 0, 0.10), 0px 0.332px 2.214px 0px rgba(0, 0, 0, 0.14)',
            transition: 'border 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderImage = 'linear-gradient(to right, #3306B2, #5812C6, #8F18C9, #C32465, #E12617, #E65708, #BCB201, #13A415, #25A448) 1')}
          onMouseOut={(e) => (e.currentTarget.style.borderImage = '')}
        >
          MetaVerse Gaming & Digital Twins
        </div>
      ),
      ds: () => (
        <div
          className="border text-black text-lg font-semibold px-4 py-2 rounded-none my-2 w-80 h-13 flex items-center justify-center"
          style={{
            boxShadow: '0px 12px 80px 0px rgba(0, 0, 0, 0.04), 0px 5.013px 33.422px 0px rgba(0, 0, 0, 0.06), 0px 2.68px 17.869px 0px rgba(0, 0, 0, 0.07), 0px 1.503px 10.017px 0px rgba(0, 0, 0, 0.08), 0px 0.798px 5.32px 0px rgba(0, 0, 0, 0.10), 0px 0.332px 2.214px 0px rgba(0, 0, 0, 0.14)',
            transition: 'border 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderImage = 'linear-gradient(to right, #3306B2, #5812C6, #8F18C9, #C32465, #E12617, #E65708, #BCB201, #13A415, #25A448) 1')}
          onMouseOut={(e) => (e.currentTarget.style.borderImage = '')}
        >
          Data Science / AI / ML
        </div>
      ),
      iot: () => (
        <div
          className="border text-black text-lg font-semibold px-4 py-2 rounded-none my-2 w-80 h-13 flex items-center justify-center"
          style={{
            boxShadow: '0px 12px 80px 0px rgba(0, 0, 0, 0.04), 0px 5.013px 33.422px 0px rgba(0, 0, 0, 0.06), 0px 2.68px 17.869px 0px rgba(0, 0, 0, 0.07), 0px 1.503px 10.017px 0px rgba(0, 0, 0, 0.08), 0px 0.798px 5.32px 0px rgba(0, 0, 0, 0.10), 0px 0.332px 2.214px 0px rgba(0, 0, 0, 0.14)',
            transition: 'border 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderImage = 'linear-gradient(to right, #3306B2, #5812C6, #8F18C9, #C32465, #E12617, #E65708, #BCB201, #13A415, #25A448) 1')}
          onMouseOut={(e) => (e.currentTarget.style.borderImage = '')}
        >
          Internet of Things
        </div>
      ),
      communication: () => (
        <div
          className="border text-black text-lg font-semibold px-4 py-2 rounded-none my-2 w-80 h-13 flex items-center justify-center"
          style={{
            boxShadow: '0px 12px 80px 0px rgba(0, 0, 0, 0.04), 0px 5.013px 33.422px 0px rgba(0, 0, 0, 0.06), 0px 2.68px 17.869px 0px rgba(0, 0, 0, 0.07), 0px 1.503px 10.017px 0px rgba(0, 0, 0, 0.08), 0px 0.798px 5.32px 0px rgba(0, 0, 0, 0.10), 0px 0.332px 2.214px 0px rgba(0, 0, 0, 0.14)',
            transition: 'border 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderImage = 'linear-gradient(to right, #3306B2, #5812C6, #8F18C9, #C32465, #E12617, #E65708, #BCB201, #13A415, #25A448) 1')}
          onMouseOut={(e) => (e.currentTarget.style.borderImage = '')}
        >
          Communication and Growth Tech
        </div>
      ),
      printing: () => (
        <div
          className="border text-black text-lg font-semibold px-4 py-2 rounded-none my-2 w-80 h-13 flex items-center justify-center"
          style={{
            boxShadow: '0px 12px 80px 0px rgba(0, 0, 0, 0.04), 0px 5.013px 33.422px 0px rgba(0, 0, 0, 0.06), 0px 2.68px 17.869px 0px rgba(0, 0, 0, 0.07), 0px 1.503px 10.017px 0px rgba(0, 0, 0, 0.08), 0px 0.798px 5.32px 0px rgba(0, 0, 0, 0.10), 0px 0.332px 2.214px 0px rgba(0, 0, 0, 0.14)',
            transition: 'border 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderImage = 'linear-gradient(to right, #3306B2, #5812C6, #8F18C9, #C32465, #E12617, #E65708, #BCB201, #13A415, #25A448) 1')}
          onMouseOut={(e) => (e.currentTarget.style.borderImage = '')}
        >
          Additive Manufacturing (3D Printing)
        </div>
      ),
      lowcode: () => (
        <div
          className="border text-black text-lg font-semibold px-4 py-2 rounded-none my-2 w-80 h-13 flex items-center justify-center"
          style={{
            boxShadow: '0px 12px 80px 0px rgba(0, 0, 0, 0.04), 0px 5.013px 33.422px 0px rgba(0, 0, 0, 0.06), 0px 2.68px 17.869px 0px rgba(0, 0, 0, 0.07), 0px 1.503px 10.017px 0px rgba(0, 0, 0, 0.08), 0px 0.798px 5.32px 0px rgba(0, 0, 0, 0.10), 0px 0.332px 2.214px 0px rgba(0, 0, 0, 0.14)',
            transition: 'border 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderImage = 'linear-gradient(to right, #3306B2, #5812C6, #8F18C9, #C32465, #E12617, #E65708, #BCB201, #13A415, #25A448) 1')}
          onMouseOut={(e) => (e.currentTarget.style.borderImage = '')}
        >
          Low Code Development
        </div>
      ),
      smartcity: () => (
        <div
          className="border text-black text-lg font-semibold px-4 py-2 rounded-none my-2 w-80 h-13 flex items-center justify-center"
          style={{
            boxShadow: '0px 12px 80px 0px rgba(0, 0, 0, 0.04), 0px 5.013px 33.422px 0px rgba(0, 0, 0, 0.06), 0px 2.68px 17.869px 0px rgba(0, 0, 0, 0.07), 0px 1.503px 10.017px 0px rgba(0, 0, 0, 0.08), 0px 0.798px 5.32px 0px rgba(0, 0, 0, 0.10), 0px 0.332px 2.214px 0px rgba(0, 0, 0, 0.14)',
            transition: 'border 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderImage = 'linear-gradient(to right, #3306B2, #5812C6, #8F18C9, #C32465, #E12617, #E65708, #BCB201, #13A415, #25A448) 1')}
          onMouseOut={(e) => (e.currentTarget.style.borderImage = '')}
        >
          Smart City / Manufacturing
        </div>
      ),
      healthcare: () => (
        <div
          className="border text-black text-lg font-semibold px-4 py-2 rounded-none my-2 w-80 h-13 flex items-center justify-center"
          style={{
            boxShadow: '0px 12px 80px 0px rgba(0, 0, 0, 0.04), 0px 5.013px 33.422px 0px rgba(0, 0, 0, 0.06), 0px 2.68px 17.869px 0px rgba(0, 0, 0, 0.07), 0px 1.503px 10.017px 0px rgba(0, 0, 0, 0.08), 0px 0.798px 5.32px 0px rgba(0, 0, 0, 0.10), 0px 0.332px 2.214px 0px rgba(0, 0, 0, 0.14)',
            transition: 'border 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderImage = 'linear-gradient(to right, #3306B2, #5812C6, #8F18C9, #C32465, #E12617, #E65708, #BCB201, #13A415, #25A448) 1')}
          onMouseOut={(e) => (e.currentTarget.style.borderImage = '')}
        >
          Health Care
        </div>
      ),
      agri: () => (
        <div
          className="border text-black text-lg font-semibold px-4 py-2 rounded-none my-2 w-80 h-13 flex items-center justify-center"
          style={{
            boxShadow: '0px 12px 80px 0px rgba(0, 0, 0, 0.04), 0px 5.013px 33.422px 0px rgba(0, 0, 0, 0.06), 0px 2.68px 17.869px 0px rgba(0, 0, 0, 0.07), 0px 1.503px 10.017px 0px rgba(0, 0, 0, 0.08), 0px 0.798px 5.32px 0px rgba(0, 0, 0, 0.10), 0px 0.332px 2.214px 0px rgba(0, 0, 0, 0.14)',
            transition: 'border 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderImage = 'linear-gradient(to right, #3306B2, #5812C6, #8F18C9, #C32465, #E12617, #E65708, #BCB201, #13A415, #25A448) 1')}
          onMouseOut={(e) => (e.currentTarget.style.borderImage = '')}
        >
          Agriculture & Food Technology
        </div>
      ),
      automobile: () => (
        <div
          className="border text-black text-lg font-semibold px-4 py-2 rounded-none my-2 w-80 h-13 flex items-center justify-center"
          style={{
            boxShadow: '0px 12px 80px 0px rgba(0, 0, 0, 0.04), 0px 5.013px 33.422px 0px rgba(0, 0, 0, 0.06), 0px 2.68px 17.869px 0px rgba(0, 0, 0, 0.07), 0px 1.503px 10.017px 0px rgba(0, 0, 0, 0.08), 0px 0.798px 5.32px 0px rgba(0, 0, 0, 0.10), 0px 0.332px 2.214px 0px rgba(0, 0, 0, 0.14)',
            transition: 'border 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderImage = 'linear-gradient(to right, #3306B2, #5812C6, #8F18C9, #C32465, #E12617, #E65708, #BCB201, #13A415, #25A448) 1')}
          onMouseOut={(e) => (e.currentTarget.style.borderImage = '')}
        >
          Automobile
        </div>
      ),
      aerospace: () => (
        <div
          className="border text-black text-lg font-semibold px-4 py-2 rounded-none my-2 w-80 h-13 flex items-center justify-center"
          style={{
            boxShadow: '0px 12px 80px 0px rgba(0, 0, 0, 0.04), 0px 5.013px 33.422px 0px rgba(0, 0, 0, 0.06), 0px 2.68px 17.869px 0px rgba(0, 0, 0, 0.07), 0px 1.503px 10.017px 0px rgba(0, 0, 0, 0.08), 0px 0.798px 5.32px 0px rgba(0, 0, 0, 0.10), 0px 0.332px 2.214px 0px rgba(0, 0, 0, 0.14)',
            transition: 'border 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderImage = 'linear-gradient(to right, #3306B2, #5812C6, #8F18C9, #C32465, #E12617, #E65708, #BCB201, #13A415, #25A448) 1')}
          onMouseOut={(e) => (e.currentTarget.style.borderImage = '')}
        >
          Aerospace & Defence
        </div>
      ),
      retail: () => (
        <div
          className="border text-black text-lg font-semibold px-4 py-2 rounded-none my-2 w-80 h-13 flex items-center justify-center"
          style={{
            boxShadow: '0px 12px 80px 0px rgba(0, 0, 0, 0.04), 0px 5.013px 33.422px 0px rgba(0, 0, 0, 0.06), 0px 2.68px 17.869px 0px rgba(0, 0, 0, 0.07), 0px 1.503px 10.017px 0px rgba(0, 0, 0, 0.08), 0px 0.798px 5.32px 0px rgba(0, 0, 0, 0.10), 0px 0.332px 2.214px 0px rgba(0, 0, 0, 0.14)',
            transition: 'border 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderImage = 'linear-gradient(to right, #3306B2, #5812C6, #8F18C9, #C32465, #E12617, #E65708, #BCB201, #13A415, #25A448) 1')}
          onMouseOut={(e) => (e.currentTarget.style.borderImage = '')}
        >
          Retail (FMCG), Real-Estate, Entertainment & Finance (BFSI)
        </div>
      ),
      power: () => (
        <div
          className="border text-black text-lg font-semibold px-4 py-2 rounded-none my-2 w-80 h-13 flex items-center justify-center"
          style={{
            boxShadow: '0px 12px 80px 0px rgba(0, 0, 0, 0.04), 0px 5.013px 33.422px 0px rgba(0, 0, 0, 0.06), 0px 2.68px 17.869px 0px rgba(0, 0, 0, 0.07), 0px 1.503px 10.017px 0px rgba(0, 0, 0, 0.08), 0px 0.798px 5.32px 0px rgba(0, 0, 0, 0.10), 0px 0.332px 2.214px 0px rgba(0, 0, 0, 0.14)',
            transition: 'border 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderImage = 'linear-gradient(to right, #3306B2, #5812C6, #8F18C9, #C32465, #E12617, #E65708, #BCB201, #13A415, #25A448) 1')}
          onMouseOut={(e) => (e.currentTarget.style.borderImage = '')}
        >
          Power / Energy
        </div>
      ),
    };