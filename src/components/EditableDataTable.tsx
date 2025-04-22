
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, X, Edit, Plus, Trash } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface DataTableProps {
  data: {
    headers: string[];
    rows: (string | number)[][];
  };
  onDataChange?: (newData: { headers: string[]; rows: (string | number)[][] }) => void;
}

const EditableDataTable = ({ data, onDataChange }: DataTableProps) => {
  const [editMode, setEditMode] = useState(false);
  const [tableData, setTableData] = useState(data);
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const { toast } = useToast();

  // Update local state when prop data changes
  useEffect(() => {
    setTableData(data);
  }, [data]);

  const startEditing = (row: number, col: number, value: string | number) => {
    if (!editMode) return;
    
    setEditingCell({ row, col });
    setEditValue(String(value));
  };

  const stopEditing = () => {
    setEditingCell(null);
  };

  const saveEditing = () => {
    if (!editingCell) return;

    const { row, col } = editingCell;
    const newRows = [...tableData.rows];
    
    // Try to convert to number if possible
    const newValue = !isNaN(Number(editValue)) && editValue.trim() !== '' 
      ? Number(editValue) 
      : editValue;
    
    newRows[row] = [...newRows[row]];
    newRows[row][col] = newValue;

    const newData = {
      ...tableData,
      rows: newRows
    };
    
    setTableData(newData);
    
    if (onDataChange) {
      onDataChange(newData);
    }
    
    stopEditing();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEditing();
    } else if (e.key === 'Escape') {
      stopEditing();
    }
  };

  const toggleEditMode = () => {
    if (editMode) {
      // If we're exiting edit mode, make sure to save any changes
      if (onDataChange) {
        onDataChange(tableData);
      }
      
      toast({
        title: "Changes saved",
        description: "Your data table edits have been saved",
      });
    }
    
    setEditMode(!editMode);
    stopEditing();
  };

  const addRow = () => {
    if (!editMode) return;
    
    // Create a new row with empty values
    const newRow = tableData.headers.map(() => '');
    const newRows = [...tableData.rows, newRow];
    
    const newData = {
      ...tableData,
      rows: newRows
    };
    
    setTableData(newData);
    
    toast({
      title: "Row added",
      description: "A new empty row has been added to the table",
    });
  };

  const deleteRow = (rowIndex: number) => {
    if (!editMode) return;
    
    const newRows = tableData.rows.filter((_, index) => index !== rowIndex);
    
    const newData = {
      ...tableData,
      rows: newRows
    };
    
    setTableData(newData);
    
    toast({
      title: "Row deleted",
      description: "The row has been removed from the table",
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Data Preview</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleEditMode}
          className={editMode ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
        >
          {editMode ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Data
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border overflow-hidden">
          <div className="max-h-[360px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {editMode && <TableHead className="w-[50px]">#</TableHead>}
                  {tableData.headers.map((header, index) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={tableData.headers.length + (editMode ? 1 : 0)} className="h-24 text-center">
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  tableData.rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {editMode && (
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 text-destructive" 
                            onClick={() => deleteRow(rowIndex)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex} onClick={() => startEditing(rowIndex, cellIndex, cell)}>
                          {editingCell && editingCell.row === rowIndex && editingCell.col === cellIndex ? (
                            <div className="flex">
                              <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onBlur={stopEditing}
                                autoFocus
                                className="h-8 py-1"
                              />
                              <div className="flex ml-1">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-8 w-8 p-0 text-green-600" 
                                  onClick={saveEditing}
                                >
                                  <Save className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-8 w-8 p-0 text-muted-foreground" 
                                  onClick={stopEditing}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className={editMode ? "cursor-pointer hover:bg-muted p-1 rounded" : ""}>
                              {cell}
                            </div>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {editMode && (
            <div className="p-2 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addRow}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Row
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableDataTable;
