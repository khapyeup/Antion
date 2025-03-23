  import { documentsTable } from "@/lib/schema";
  import { supabase } from "@/lib/supabase";
  import { useEffect, useState } from "react";

  export function useDocumentRealtime(documentId: string) {
      const [document, setDocument] = useState<Partial<typeof documentsTable.$inferSelect>>({});
    
      useEffect(() => {
        const channel = supabase
          .channel(`documentw`)
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "documents",
              filter: `id=eq.${documentId}`,
            },
            (payload) => {
              const updatedDoc = payload.new as typeof documentsTable.$inferSelect;
              setDocument((prev) => ({ ...prev,...updatedDoc })); // Overwrite state
            }
          )
          .subscribe();
    
        return () => {
          supabase.removeChannel(channel);
        };
      }, [documentId]);
      
      return document;
    }