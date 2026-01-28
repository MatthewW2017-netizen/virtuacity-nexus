"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Node } from "@/types/chat";
import { HexCityNode } from "./CityElements";
import { cn } from "@/lib/utils";

interface CityGridCanvasProps {
  nodes: Node[];
  activeNodeId: string;
  onNodeClick: (id: string) => void;
  canvasPos: { x: number; y: number; zoom: number };
  setCanvasPos: React.Dispatch<React.SetStateAction<{ x: number; y: number; zoom: number }>>;
  isWarping?: boolean;
  children?: React.ReactNode; // For panels
}

export const CityGridCanvas = ({
  nodes,
  activeNodeId,
  onNodeClick,
  canvasPos,
  setCanvasPos,
  isWarping = false,
  children
}: CityGridCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Use springs for smooth movement
  const springConfig = { damping: 30, stiffness: 200 };
  const canvasX = useSpring(canvasPos.x, springConfig);
  const canvasY = useSpring(canvasPos.y, springConfig);
  const canvasZoom = useSpring(canvasPos.zoom, springConfig);

  useEffect(() => {
    canvasX.set(canvasPos.x);
    canvasY.set(canvasPos.y);
    canvasZoom.set(canvasPos.zoom);
  }, [canvasPos.x, canvasPos.y, canvasPos.zoom, canvasX, canvasY, canvasZoom]);

  const handleDrag = (event: any, info: any) => {
    setCanvasPos(prev => ({
      ...prev,
      x: prev.x + info.delta.x,
      y: prev.y + info.delta.y
    }));
  };

  return (
    <div 
      ref={canvasRef}
      className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing select-none"
    >
      {/* The World Layer */}
      <motion.div
        drag
        dragMomentum={false}
        onDrag={handleDrag}
        animate={{
          filter: isWarping ? "blur(10px) brightness(1.5) contrast(1.2)" : "blur(0px) brightness(1) contrast(1)",
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut"
        }}
        style={{
          x: canvasX,
          y: canvasY,
          scale: canvasZoom,
        }}
        className="relative w-full h-full"
      >
        {/* Infinite Background Grid */}
        <div 
          className="absolute inset-[-5000px] pointer-events-none opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(75, 63, 226, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(75, 63, 226, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: 'center center'
          }}
        />
        <div 
          className="absolute inset-[-5000px] pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(75, 63, 226, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(75, 63, 226, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: 'center center'
          }}
        />

        {/* City Nodes */}
        <div className="absolute inset-0">
          {nodes.map((node) => {
            return (
              <HexCityNode
                key={node.id}
                node={node}
                x={node.x}
                y={node.y}
                zoom={1}
                isActive={node.id === activeNodeId}
                onClick={() => onNodeClick(node.id)}
              />
            );
          })}
        </div>

        {/* Panels and other floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="pointer-events-auto">
            {children}
          </div>
        </div>
      </motion.div>

      {/* Parallax Background Elements (Static) */}
      <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#050508]">
        {/* Deep Mythic Layer (Slowest) */}
        <motion.div 
          animate={{
            x: canvasPos.x * 0.02,
            y: canvasPos.y * 0.02,
          }}
          className="absolute inset-[-1000px] opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(circle at 10% 20%, rgba(75, 63, 226, 0.12) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.08) 0%, transparent 40%),
              radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 60%)
            `
          }}
        />

        {/* Vertical Data Lanes (Parallax) */}
        <motion.div
          animate={{
            x: canvasPos.x * 0.04,
            y: canvasPos.y * 0.04,
          }}
          className="absolute inset-[-500px] opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '200px 100%'
          }}
        />

        {/* Neural Clouds Layer (Medium Speed) */}
        <motion.div 
          animate={{
            x: canvasPos.x * 0.08,
            y: canvasPos.y * 0.08,
          }}
          className="absolute inset-[-300px] opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 40%, rgba(75, 63, 226, 0.1) 0%, transparent 30%),
              radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.05) 0%, transparent 30%)
            `
          }}
        />

        {/* Aether Dust & Floating Packets (Fastest) */}
        <motion.div
          animate={{
            x: canvasPos.x * 0.15,
            y: canvasPos.y * 0.15,
          }}
          className="absolute inset-[-500px]"
        >
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute rounded-full",
                i % 4 === 0 ? "w-1 h-1 bg-nexus-cyan blur-[1px]" : "w-0.5 h-0.5 bg-white"
              )}
              initial={{ 
                x: Math.random() * 3000, 
                y: Math.random() * 3000,
                opacity: Math.random() * 0.2 + 0.1
              }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.5, 1],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Cinematic Scanlines */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] z-50 opacity-[0.03]" />
      </div>
    </div>
  );
};
