import { getFilters,addFilter,updateFilter,deleteFilter } from "../services/filterService";
import { Request, Response } from 'express';


export class FiltersController {
        
        constructor() {
        }
    
        public async updateFilter(req: Request): Promise<any> {
            try {
               const {id,name} = req.body;
               
                await updateFilter(id, name);
            } catch (error) {
                return ;
            }
        }
        
        public async getFilters(req: Request, res: Response): Promise<any> {
            try {
                 const filters = await getFilters();
                 return filters;
            } catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    
        public async addFilter(req: Request, res: Response): Promise<void> {
            try {
                const {name} = req.body;
                await addFilter(name);
            } catch (error) {
                 res.status(500).json({ error: 'Internal server error' });
            }
        }
    
        public async deleteFilter(req: Request, res: Response): Promise<void> {
            try {
                const {id} = req.body;
                await deleteFilter(id);
            } catch (error) {
                 res.status(500).json({ error: 'Internal server error' });
            }
        }
    }