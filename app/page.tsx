"use client";


import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Vous êtes maintenant inscrit !");
        setEmail("");
      } else {
        toast.error(data.error || "Une erreur est survenue !");
      }
    } catch (error) {
      toast.error("Une erreur est survenue !");
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div
  className="flex flex-col justify-center items-center h-screen "
  data-theme="dracula"
>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />

      <div className="flex items-center mb-6">
        <div className="flex flex-col items-center">

          <div className="h-52 aspect-square bg-[url('/attendancy.jpeg')] z-50 bg-cover bg-center rounded-3xl">

          </div>

          <div className="w-full p-10 pt-0">
            <h1 className="text-2xl md:text-2xl text-center font-bold">Abonne-toi {email}</h1>

            <p className="my-4 text-sm">
              Recevez des Notification en ligne des activiter de votre Organisation
            </p>

            <form onSubmit={handleSubmit} className="flex items-center w-full">
              <input
                type="email"
                className="input my-4 text-sm input-bordered w-full"
                placeholder="email@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="btn ml-2 text-base text-center btn-info" title="S'abonner" type="submit" disabled={isLoading}>
                {isLoading ? "En cours..." : "S'abonner"}
              </button>
            </form>

            <p className="text-xs text-center mt-2">Sécurisé par Attendancy</p>
          </div>
        </div>

      </div>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
    </div>
  );
}
