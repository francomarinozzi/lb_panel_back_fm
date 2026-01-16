const login = (req, res) => {
    // 1. Obtenemos datos del body
    const { username, password } = req.body;

    // 2. Validamos que no lleguen vacíos
    if (!username || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
    }

    // 3. Comparamos contra las variables de entorno
    // NOTA: En el futuro, aquí compararíamos hashes, pero para esto sirve directo.
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        
        // Login Exitoso
        return res.status(200).json({ 
            success: true,
            message: 'Success',
        });

    } else {
        // Credenciales incorrectas
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
};

module.exports = { login };