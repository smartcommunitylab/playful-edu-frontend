export const importLibraryItalianMessages = {
  csv: {
    buttonMain: {
      label: "Importa",
      tooltip: "Deve essere un file '.csv' o '.tsv'",
      emptyResource:
        "La proprietà 'resource' era vuota, hai passato {...props} al pulsante di importazione?",
    },
    parsing: {
      collidingIds: "Trovati record con ID che collidono",
      failedValidateRow: "Il CSV non ha superato i requisiti di validazione",
      invalidCsv: 'Il documento non può essere analizzato come file "csv"',
    },
    dialogCommon: {
      subtitle:
        'Importazione di %{count} elementi dal file %{fileName} a "%{resource}"',
      conflictCount:
        'La risorsa "%{resource}" presenta <strong>%{conflictingCount}</strong> record con ID collidente/i',
      buttons: {
        cancel: "Annulla",
      },
    },
    dialogImport: {
      alertClose: "%{fname} importato",
      title: 'Importazione in "%{resource}"',
      buttons: {
        replaceAllConflicts: "Sostituisci le righe",
        skipAllConflicts: "Salta queste righe",
        letmeDecide: "Lascia che decida per ogni riga",
      },
    },
    dialogDecide: {
      title: 'Importazione in "%{resource}" dell\'elemento con ID %{id}',
      buttons: {
        replaceRow: "Sostituisci la riga con ID %{id}",
        addAsNewRow: "Aggiungi come nuova riga (non sostituire)",
        skipDontReplace: "Salta questa riga (non sostituire)",
      },
    },
    loading: "Caricamento...",
  },
};
