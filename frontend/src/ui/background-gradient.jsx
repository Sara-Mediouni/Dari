import React from "react";
import { motion } from "motion/react";
import clsx from "clsx";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true
}) => {
  const variants = {
    initial: { backgroundPosition: "0% 50%" },
    animate: { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] },
  };

  return (
    <div className={clsx("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial="initial"
        animate="animate"
        transition={animate ? { duration: 5, repeat: Infinity, repeatType: "reverse" } : undefined}
        style={{
          backgroundSize: "200% 200%", // Permet de voir l'animation
        }}
        className={clsx(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#87986a,transparent),radial-gradient(circle_farthest-side_at_100%_0,#87986a,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#3c096c,transparent),radial-gradient(circle_farthest-side_at_0_0,#5f0f40,#5f0f40)]"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial="initial"
        animate="animate"
        transition={animate ? { duration: 5, repeat: Infinity, repeatType: "reverse" } : undefined}
        style={{
          backgroundSize: "200% 200%",
        }}
        className={clsx(
          "absolute inset-0  rounded-3xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#718355,transparent),radial-gradient(circle_farthest-side_at_100%_0,#d9dcd6,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#718355,transparent),radial-gradient(circle_farthest-side_at_0_0,#718355,#718355)]"
        )}
      />
      <div className={clsx("relative z-10", className)}>{children}</div>
    </div>
  );
};
