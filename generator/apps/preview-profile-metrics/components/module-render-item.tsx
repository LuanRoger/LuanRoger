import { ModuleMetadata } from "metrics-modules/modules";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";

interface ModuleRenderItemProps {
  moduleMetadata: ModuleMetadata;
  base64Image: string;
}

export default function ModuleRenderItem({
  moduleMetadata,
  base64Image,
}: ModuleRenderItemProps) {
  const { name, description, width, height } = moduleMetadata;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          width={width}
          height={height}
          src={`data:image/png;base64,${base64Image}`}
          alt="github profile"
        />
      </CardContent>
    </Card>
  );
}
