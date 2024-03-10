"use client";

import { GoogleLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-20 pb-12 pt-48">
      <Button
        size={"lg"}
        onClick={() => signIn("google", { callbackUrl: "/app" })}
      >
        <GoogleLogo className="mr-4" />
        Login con Google
      </Button>
      <br />
      <div className="prose dark:prose-invert prose-sm mx-auto p-4">
        <h2>¿Sos dueño?</h2>
        <h3>Viste tu negocio y lo querés reclamar</h3>
        <h4>1 - Creá tu cuenta</h4>
        <p>
          Apretá el botón de &quot;Login&quot; de arriba a la izquierda y
          vinculá tu cuenta de Google. Solo tendrémos acceso a tu email y tu
          nombre para generar un usuario local.
        </p>
        <h4>2 - Escribinos un mensaje</h4>
        <p>
          Luego solo queda verificar de que seas dueño, envianos un Whatsapp a{" "}
          <Button asChild variant={"link"} className="px-0">
            <Link href="https://wa.me/+5493455286829">+54 9 345 528-6829</Link>
          </Button>{" "}
          desde la cuenta de tu local con el email que te diste de alta. En
          breve verificaremos la petición y te asignamos como dueño en la
          plataforma.
        </p>
        <h4>Excelente! Ya podes configurar tu local</h4>
        <hr className="mt-8" />
        <h2>Querés dar de alta tu negocio</h2>
        <h4>1 - Creá tu cuenta</h4>
        <p>
          Apretá el botón de &quot;Login&quot; de arriba a la izquierda y
          vinculá tu cuenta de Google. Solo tendrémos acceso a tu email y tu
          nombre para generar un usuario local.
        </p>
        <h4>2 - Cargá tu propuesta</h4>
        <p>
          Navegá hasta tu panel de usuario desde la esquina superior izquierda.
          Una vez dentro vas a tener la opción de &quot;Crear tu negocio&quot;,
          cargá los datos y envialo.
        </p>
        <h4>3 - Esperá la revisión</h4>
        <p>
          Una vez enviada la propuesta, los administradores verificaran los
          datos. Si está todo correcto lo marcaran de acceso publico y se te
          otorgarán más permisos como dueño.
        </p>
        <p>
          Si querés agilizar este paso, mandame un texto{" "}
          <Button asChild variant={"link"} className="px-0">
            <Link href="https://wa.me/+5493455286829">+54 9 345 528-6829</Link>
          </Button>
        </p>
        <h4>Felicitaciones! Ya diste de alta tu local</h4>
      </div>
    </div>
  );
}
