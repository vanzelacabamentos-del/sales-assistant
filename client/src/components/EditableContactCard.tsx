import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2, Save, X, Mail, Phone, Building } from "lucide-react";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position?: string;
  notes?: string;
}

interface EditableContactCardProps {
  contact: Contact;
  onUpdate: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export default function EditableContactCard({
  contact,
  onUpdate,
  onDelete,
}: EditableContactCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Contact>(contact);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(contact);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja remover este contato?")) {
      onDelete(contact.id);
    }
  };

  if (isEditing) {
    return (
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Editar Contato
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nome
            </label>
            <Input
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              className="bg-input border-border"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input
                type="email"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Telefone
              </label>
              <Input
                value={editData.phone}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
                className="bg-input border-border"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Empresa
              </label>
              <Input
                value={editData.company}
                onChange={(e) =>
                  setEditData({ ...editData, company: e.target.value })
                }
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Cargo
              </label>
              <Input
                value={editData.position || ""}
                onChange={(e) =>
                  setEditData({ ...editData, position: e.target.value })
                }
                className="bg-input border-border"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notas
            </label>
            <textarea
              value={editData.notes || ""}
              onChange={(e) =>
                setEditData({ ...editData, notes: e.target.value })
              }
              className="w-full p-2 rounded-lg border border-border bg-input text-foreground"
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Save size={16} />
              Salvar
            </Button>
            <Button onClick={handleCancel} variant="outline" className="gap-2">
              <X size={16} />
              Cancelar
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card border-border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{contact.name}</h3>
          {contact.position && (
            <p className="text-sm text-muted-foreground">{contact.position}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
            className="gap-1"
          >
            <Edit2 size={14} />
            Editar
          </Button>
          <Button
            onClick={handleDelete}
            variant="outline"
            size="sm"
            className="gap-1 text-destructive hover:text-destructive"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail size={16} />
          <a href={`mailto:${contact.email}`} className="hover:text-primary">
            {contact.email}
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone size={16} />
          <a href={`tel:${contact.phone}`} className="hover:text-primary">
            {contact.phone}
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building size={16} />
          <span>{contact.company}</span>
        </div>
      </div>

      {contact.notes && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-foreground">{contact.notes}</p>
        </div>
      )}
    </Card>
  );
}
