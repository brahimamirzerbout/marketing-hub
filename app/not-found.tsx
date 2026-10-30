import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound(){return <div className="site-container py-24 text-center"><p className="text-sm text-muted-foreground">404</p><h1 className="mt-4 text-3xl font-semibold tracking-tight">That page is not here.</h1><p className="mt-4 text-muted-foreground">Try the component collection or return to the homepage.</p><Button asChild className="mt-8"><Link href="/">Back to the foundation</Link></Button></div>;}
