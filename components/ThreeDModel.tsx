"use client"
import React, { Suspense, useState, useEffect, useLayoutEffect, Fragment } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, OrbitControls, useGLTF, Html } from '@react-three/drei'
import ListBox from './Listbox';
import * as THREE from 'three';

type ThreeDModelProps = {
    modelUrl: string;
    modelScale: number;
    animate?: boolean;
    enableDamping?: boolean;
    enablePan?: boolean;
    enableZoom?: boolean;
    loader?: JSX.Element;
}

const ThreeDModel = ({
    modelUrl,
    modelScale,
    animate = true,
    enableDamping = false,
    enablePan = false,
    enableZoom = false,
    loader
}: ThreeDModelProps) => {


    const [modelAnimation, setmodelAnimation] = useState<{ id: string, name: string }[]>([]);
    const [selectedAnimation, setselectedAnimation] = useState<number>(0);


    function Model({ url }: { url: string }) {

        const { scene, animations } = useGLTF(url, true);


        useLayoutEffect(() => {
            if (animate && animations.length > 0 && modelAnimation.length === 0) {
                setmodelAnimation(animations.map((animation, index) => {
                    return { id: index.toString(), name: animation.name }
                }));
            }
        }, [animations]);

        // initialize mixer in useMemo to avoid re-creating it on every frame
        const mixer = React.useMemo(() => new THREE.AnimationMixer(scene), [scene]);

        useEffect(() => {
            if (animate && mixer && selectedAnimation) {
                mixer.clipAction(animations[selectedAnimation]).play();
            }
        }, [animations, mixer]);



        useFrame((state, delta) => {
            if (animate && mixer) {
                mixer.update(delta);
            }
        });



        return <primitive object={scene} dispose={null} />;

    }




    return (
        <>
            <div
                className='absolute m-6 z-40 w-36'
            >
                {animate && selectedAnimation !== null && modelAnimation.length > 0 && (
                    <ListBox
                        options={modelAnimation}
                        selected={selectedAnimation}
                        setSelected={setselectedAnimation}
                    />
                )}
            </div>
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 15, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -15, -10]} />
                <Suspense fallback={
                    <Html
                        center
                    >
                        {loader ? loader : null}

                    </Html>
                }>
                    <Bounds fit clip observe margin={modelScale}>
                        <Model url={modelUrl} />
                    </Bounds>
                </Suspense>
                <OrbitControls
                    autoRotate={!animate}
                    makeDefault
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 1.75}
                    enableDamping={enableDamping}
                    enablePan={enablePan}
                    enableZoom={enableZoom}
                />
            </Canvas>
        </>
    )
}

export default ThreeDModel