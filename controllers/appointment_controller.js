const Vehicle = require('../models/Vehicle');
const Service = require('../models/Service');
const Appointment = require('../models/Appointment');

const AppointmentController = {
    showAddAppointmentPage: async (req, res) => {
        // Obtener la lista de servicios desde la base de datos o donde los tengamos almacenados
        
        const service = await Service.findByPk(req.params.id_service);
        const user_id = req.user.id;
        const vehicles = await Vehicle.findAll({ where: { user_id } });

        res.render('schedule-appointment', { vehicles, service, user: req.user, isAuthenticated: req.isAuthenticated() });
    },
    showActiveAppointmentsPage: async (req, res) => {
        try {
            let appointments = {};

            if(req.user.type === 'company') {
                appointments = await Appointment.findAll({
                    include: [
                        {
                            model: Service,
                            attributes: ['title'] ,
                            where: {
                                company_id: req.user.id
                            }// Los atributos que deseamos seleccionar
                        },
                        {
                            model: Vehicle,
                            attributes: ['brand', 'model'] // Los atributos que deseamos seleccionar
                        }
    
                    ]
                });
            }else{
                appointments = await Appointment.findAll({
                    where: {
                        user_id: req.user.id
                    },
                    include: [
                        {
                            model: Service,
                            attributes: ['title'] // Los atributos que deseamos seleccionar
                        },
                        {
                            model: Vehicle,
                            attributes: ['brand', 'model'] // Los atributos que deseamos seleccionar
                        }
    
                    ]
                });
            }

            return res.render('active-appointments', { appointments, user: req.user, isAuthenticated: req.isAuthenticated() });
        } catch (error) {
            console.log(error);
            return res.status(404).json({ error: 'Appoitments no encontrados' });
        }
    },
    addAppointment: async (req, res) => {
        try {
            const { service_id, vehicle_id, appointment_date } = req.body;
        
            const newAppoiment = await Appointment.create({
                service_id,
                vehicle_id,
                appointment_date,
                user_id: req.user.id
            });
          
            const appointments = await Appointment.findAll({
                where: {
                    user_id: req.user.id
                },
                include: [
                    {
                        model: Service,
                        attributes: ['title'] // Los atributos que deseamos seleccionar
                    },
                    {
                        model: Vehicle,
                        attributes: ['brand', 'model'] // Los atributos que deseamos seleccionar
                    }

                ]
            });

            return res.render('active-appointments', { appointments, user: req.user, isAuthenticated: req.isAuthenticated(), message: 'Cita agregada exitosamente' });
        } catch (error) {
            console.error('Error al agregar el cita:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
      },
      completeAppointment: async (req, res) => {
        try {

            const appointment = await Appointment.findByPk(req.params.id_pointment);

            if (!appointment) {
              // Si la cita no existe, no se puede marcar como completada
              return false;
            }
        
            // Marcar la cita como completada (actualizar el estado)
            appointment.status = 'completed'; 
            await appointment.save();

            res.redirect('/active-appointments');
            
        } catch(error) {
            console.error('Error al mostrar citas:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
      
}

module.exports = AppointmentController;