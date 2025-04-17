# Guía de Integración: Generación de QR para Visitas

Esta guía explica cómo integrar el sistema de generación de códigos QR para visitas utilizando Python (backend) y React (frontend).

## Descripción General

El sistema permite a los residentes generar códigos QR para sus visitas, que luego pueden compartir con sus visitantes. Estos códigos QR contienen la información de la visita y pueden ser escaneados en la entrada del edificio para verificar y registrar la entrada.

## Componentes

1. **Backend Python**:
   - `qr_generator.py`: Módulo para generar y validar códigos QR
   - `qr_api.py`: API Flask con endpoints para generar y validar QR

2. **Frontend React**:
   - Componente formulario de visitas existente
   - Integración con la API para solicitar y mostrar el QR

## Configuración del Backend

1. **Instalar dependencias**:
   ```bash
   pip install qrcode pillow flask flask-cors
   ```

2. **Ejecutar el servicio de QR**:
   ```bash
   python qr_api.py
   ```
   
   Este servicio se ejecutará en el puerto 5002.

## Integración con el Formulario de Visitas

### 1. Modificar el Componente de Formulario de Visitas

Localiza el componente que maneja el formulario de registro de visitas. Normalmente estaría en un archivo como `client/src/components/registrar-visita-form.tsx` o similar.

### 2. Agregar el Botón para Generar QR

```tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import QRCode from 'qrcode.react'; // Necesitarás instalar este paquete: npm install qrcode.react

// Dentro de tu componente
const [isGeneratingQR, setIsGeneratingQR] = useState(false);
const [qrData, setQrData] = useState<string | null>(null);

// Función para generar el QR
const handleGenerateQR = async () => {
  // Validar que el formulario esté completo
  if (!form.formState.isValid) {
    toast({
      title: "Formulario incompleto",
      description: "Por favor complete todos los campos requeridos",
      variant: "destructive"
    });
    return;
  }
  
  // Obtener los datos del formulario
  const formData = form.getValues();
  
  try {
    setIsGeneratingQR(true);
    
    // Llamar a la API para generar el QR
    const response = await fetch('http://localhost:5002/api/visits/generate-qr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        visitor_name: formData.nombreVisitante,
        resident_name: formData.nombreResidente,
        apartment: formData.departamento,
        visit_date: formData.fecha,
        visit_time: formData.hora,
        notes: formData.notas || ''
      }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Guardar la imagen del QR en base64
      setQrData(data.qr_base64);
      
      toast({
        title: "QR generado exitosamente",
        description: "Puede descargar o compartir el QR con su visitante",
      });
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Error al generar QR:", error);
    toast({
      title: "Error al generar QR",
      description: error instanceof Error ? error.message : "Ocurrió un error inesperado",
      variant: "destructive"
    });
  } finally {
    setIsGeneratingQR(false);
  }
};

// Función para descargar el QR
const handleDownloadQR = () => {
  if (!qrData) return;
  
  const link = document.createElement('a');
  link.href = qrData;
  link.download = `visita-qr-${new Date().toISOString().slice(0, 10)}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Función para compartir el QR
const handleShareQR = async () => {
  if (!qrData || !navigator.share) return;
  
  try {
    // Convertir base64 a Blob
    const fetchResponse = await fetch(qrData);
    const blob = await fetchResponse.blob();
    
    // Compartir utilizando Web Share API
    await navigator.share({
      title: 'QR para visita',
      text: 'Código QR para tu visita a mi departamento',
      files: [new File([blob], 'qr-visita.png', { type: 'image/png' })]
    });
    
    toast({
      title: "QR compartido",
      description: "El QR ha sido compartido exitosamente",
    });
  } catch (error) {
    console.error("Error al compartir:", error);
    toast({
      title: "Error al compartir",
      description: "No se pudo compartir el QR",
      variant: "destructive"
    });
  }
};

// En la parte de renderizado, después del formulario
{qrData ? (
  <div className="mt-6 p-4 border rounded-lg bg-background">
    <h3 className="text-lg font-medium mb-2">Código QR generado</h3>
    <div className="flex flex-col items-center">
      <img src={qrData} alt="QR de visita" className="w-56 h-56 mb-4" />
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={handleDownloadQR}
        >
          Descargar QR
        </Button>
        {navigator.share && (
          <Button 
            variant="outline" 
            onClick={handleShareQR}
          >
            Compartir QR
          </Button>
        )}
      </div>
    </div>
  </div>
) : (
  <Button
    type="button"
    className="mt-4"
    onClick={handleGenerateQR}
    disabled={isGeneratingQR}
  >
    {isGeneratingQR ? "Generando QR..." : "Generar QR para visita"}
  </Button>
)}
```

### 3. Instalar Dependencias en el Frontend

```bash
npm install qrcode.react
```

## Flujo de Trabajo

1. El residente completa el formulario de visita con los datos del visitante.
2. El residente hace clic en "Generar QR para visita".
3. El frontend envía los datos a la API Python.
4. La API genera el código QR y devuelve la imagen en formato base64.
5. El frontend muestra el QR al residente.
6. El residente puede descargar o compartir el QR con su visitante.
7. El visitante muestra el QR al llegar al edificio.
8. El personal de seguridad escanea el QR para verificar la visita.

## Implementación Alternativa: Integración con Node.js

Si prefieres no ejecutar un servicio Python separado, puedes integrar la generación de QR directamente en el backend de Node.js utilizando el paquete `qrcode`:

```javascript
// Instalar: npm install qrcode
const QRCode = require('qrcode');
const express = require('express');
const app = express();

app.post('/api/visits/generate-qr', async (req, res) => {
  try {
    const visitData = req.body;
    
    // Validar datos
    const requiredFields = ['visitor_name', 'resident_name', 'apartment', 'visit_date', 'visit_time'];
    for (const field of requiredFields) {
      if (!visitData[field]) {
        return res.status(400).json({
          success: false,
          error: `Campo requerido faltante: ${field}`
        });
      }
    }
    
    // Generar ID único
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const visitId = `${visitData.apartment.replace(/\s/g, '')}-${timestamp}`;
    visitData.visit_id = visitId;
    
    // Generar QR en base64
    const qrDataString = JSON.stringify(visitData);
    const qrBase64 = await QRCode.toDataURL(qrDataString);
    
    res.json({
      success: true,
      qr_base64: qrBase64,
      visit_id: visitId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
```

## Notas Importantes

1. **Seguridad**: Para una implementación en producción, considera:
   - Usar HTTPS para todas las comunicaciones
   - Implementar autenticación para las llamadas a la API
   - Cifrar los datos sensibles en el QR

2. **Persistencia**: Para un sistema completo:
   - Guardar la información de las visitas en la base de datos
   - Asociar el QR generado con un registro en la base de datos
   - Implementar un sistema de verificación que consulte la base de datos

3. **Personalización**: Puedes personalizar el QR:
   - Añadir el logo del edificio en el centro del QR
   - Usar colores que coincidan con la estética de la aplicación
   - Incluir más información en la imagen del QR, como instrucciones

## Solución de Problemas

- **CORS**: Si experimentas problemas de CORS, asegúrate de configurar correctamente los encabezados en tu API Python:
  ```python
  from flask_cors import CORS
  app = Flask(__name__)
  CORS(app)  # Permitir solicitudes desde cualquier origen
  ```

- **Puerto ocupado**: Si el puerto 5002 está en uso, cambia a otro puerto y actualiza las referencias en el frontend.

- **Dependencias**: Asegúrate de que todas las dependencias estén instaladas tanto en el backend como en el frontend.