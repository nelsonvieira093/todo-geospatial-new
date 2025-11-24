// src/components/TodoForm.tsx - VERSÃO COMPLETA
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { 
  Box, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  Typography 
} from "@mui/material";
import { TodoMap } from "./TodoMap";
import "../styles/TodoForm.css";

const schema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().optional(),
  priority: z.enum(["low","medium","high"]),
  status: z.enum(["pending", "in-progress", "done"]), 
  dueDate: z.string().optional(),
  category: z.string().optional(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string().optional()
  }).optional()
});

export type TodoFormData = z.infer<typeof schema>;

interface TodoFormProps {
  onSubmit: (data: any) => void;
  initialData?: Partial<TodoFormData>;
}

export function TodoForm({ onSubmit, initialData }: TodoFormProps) {
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  //const [selectedLocation, setSelectedLocation] = useState<{lat: number; lng: number} | null>(null);

  const { register, handleSubmit, formState:{errors}, setValue, watch } = useForm<TodoFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: "pending",
      priority: "medium",
      category: "",
      location: {
        lat: -23.5505,
        lng: -46.6333,
        address: ""
      },
      ...initialData
    }
  });

  const currentLocation = watch("location");

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    setValue("location.lat", lat);
    setValue("location.lng", lng);
    setMapDialogOpen(false);
  };

  const handleFormSubmit = (data: TodoFormData) => {
    const now = new Date().toISOString();
    
    const formData = {
      title: data.title,
      description: data.description || "",
      priority: data.priority,
      status: data.status,
      completed: data.status === 'done',
      dueDate: data.dueDate || undefined,
      category: data.category || undefined,
      location: data.location?.lat && data.location?.lng ? {
        lat: data.location.lat,
        lng: data.location.lng,
        address: data.location.address
      } : undefined,
      createdAt: now,
      updatedAt: now
    };

    onSubmit(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} style={{ 
        padding: '20px', 
        border: '1px solid #ccc', 
        margin: '10px 0',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3 style={{ marginTop: 0, color: '#1976d2' }}>Criar Nova Tarefa</h3>
        
        {/* TÍTULO */}
        <div style={{ marginBottom: '15px' }}>
          <input 
            placeholder="Título *" 
            {...register("title")}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
          {errors.title && <p style={{ color: 'red', margin: '5px 0', fontSize: '14px' }}>{errors.title.message}</p>}
        </div>

        {/* DESCRIÇÃO */}
        <div style={{ marginBottom: '15px' }}>
          <textarea 
            placeholder="Descrição" 
            {...register("description")}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              minHeight: '80px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* PRIORIDADE E STATUS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Prioridade</label>
            <select 
              {...register("priority")}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Status</label>
            <select 
              {...register("status")}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            >
              <option value="pending">Pendente</option>
              <option value="in-progress">Em Progresso</option>
              <option value="done">Concluída</option>
            </select>
          </div>
        </div>

        {/* DATA DE VENCIMENTO E CATEGORIA */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Data de Vencimento</label>
            <input 
              type="date" 
              {...register("dueDate")}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Categoria</label>
            <input 
              type="text" 
              placeholder="Categoria"
              {...register("category")}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
        </div>

        {/* SEÇÃO DE LOCALIZAÇÃO ATUALIZADA */}
        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <h4 style={{ margin: 0, color: '#1976d2' }}>📍 Localização</h4>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => setMapDialogOpen(true)}
            >
              🗺️ Selecionar no Mapa
            </Button>
          </Box>

          {currentLocation?.lat && currentLocation?.lng && (
            <Typography variant="body2" sx={{ mb: 2, color: 'green' }}>
              ✅ Localização selecionada: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
            </Typography>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Latitude</label>
              <input 
                type="number" 
                step="any" 
                placeholder="Latitude" 
                {...register("location.lat", { valueAsNumber: true })} 
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Longitude</label>
              <input 
                type="number" 
                step="any" 
                placeholder="Longitude" 
                {...register("location.lng", { valueAsNumber: true })} 
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Endereço (opcional)</label>
            <input 
              type="text" 
              placeholder="Ex: Rua das Flores, 123" 
              {...register("location.address")} 
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
        </div>

        <button 
          type="submit" 
          style={{
            padding: '12px 24px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            width: '100%'
          }}
        >
          Salvar Tarefa
        </button>
      </form>

      {/* MODAL DE SELEÇÃO DE MAPA */}
      <Dialog 
        open={mapDialogOpen} 
        onClose={() => setMapDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Selecionar Localização no Mapa</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Clique em qualquer lugar do mapa para selecionar a localização
          </Typography>
          <TodoMap 
            todos={[]}
            onMapClick={handleMapClick}
            selectMode={true}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}