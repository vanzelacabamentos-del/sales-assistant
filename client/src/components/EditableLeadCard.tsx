import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2, Save, X, DollarSign, TrendingUp } from "lucide-react";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  value: number;
  probability: number;
  notes?: string;
}

interface EditableLeadCardProps {
  lead: Lead;
  onUpdate: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

export default function EditableLeadCard({
  lead,
  onUpdate,
  onDelete,
}: EditableLeadCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Lead>(lead);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(lead);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja remover este lead?")) {
      onDelete(lead.id);
    }
  };

  if (isEditing) {
    return (
      <Card className="p-4 bg-card border-border">
        <div className="space-y-3">
          <Input
            placeholder="Nome"
            value={editData.name}
            onChange={(e) =>
              setEditData({ ...editData, name: e.target.value })
            }
            className="bg-input border-border text-sm"
          />
          <Input
            placeholder="Empresa"
            value={editData.company}
            onChange={(e) =>
              setEditData({ ...editData, company: e.target.value })
            }
            className="bg-input border-border text-sm"
          />
          <Input
            type="email"
            placeholder="Email"
            value={editData.email}
            onChange={(e) =>
              setEditData({ ...editData, email: e.target.value })
            }
            className="bg-input border-border text-sm"
          />
          <Input
            placeholder="Telefone"
            value={editData.phone}
            onChange={(e) =>
              setEditData({ ...editData, phone: e.target.value })
            }
            className="bg-input border-border text-sm"
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Valor (R$)"
              value={editData.value}
              onChange={(e) =>
                setEditData({ ...editData, value: parseFloat(e.target.value) })
              }
              className="bg-input border-border text-sm"
            />
            <Input
              type="number"
              placeholder="Probabilidade (%)"
              value={editData.probability}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  probability: parseFloat(e.target.value),
                })
              }
              className="bg-input border-border text-sm"
              min="0"
              max="100"
            />
          </div>
          <textarea
            placeholder="Notas"
            value={editData.notes || ""}
            onChange={(e) =>
              setEditData({ ...editData, notes: e.target.value })
            }
            className="w-full p-2 rounded-lg border border-border bg-input text-foreground text-sm"
            rows={2}
          />
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              size="sm"
              className="bg-primary hover:bg-primary/90 gap-1"
            >
              <Save size={14} />
              Salvar
            </Button>
            <Button
              onClick={handleCancel}
              size="sm"
              variant="outline"
              className="gap-1"
            >
              <X size={14} />
              Cancelar
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-card border-border hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground text-sm">{lead.name}</h4>
          <p className="text-xs text-muted-foreground">{lead.company}</p>
        </div>
        <div className="flex gap-1">
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
            className="h-7 w-7 p-0"
          >
            <Edit2 size={12} />
          </Button>
          <Button
            onClick={handleDelete}
            variant="outline"
            size="sm"
            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 size={12} />
          </Button>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <DollarSign size={12} />
          <span className="font-semibold text-foreground">
            R$ {lead.value.toLocaleString("pt-BR")}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <TrendingUp size={12} />
          <span className="font-semibold text-foreground">
            {lead.probability}% de chance
          </span>
        </div>
        <div className="text-xs text-muted-foreground truncate">
          📧 {lead.email}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          📱 {lead.phone}
        </div>
      </div>

      {lead.notes && (
        <div className="mt-2 p-2 bg-muted rounded text-xs text-foreground">
          {lead.notes}
        </div>
      )}
    </Card>
  );
}
