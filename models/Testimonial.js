let connection;
class Testimonial {
    constructor(username, email, message) {
      this.username = username;
      this.email = email;
      this.message = message;
    }
    static setConnection(conn)
    {
        connection = conn;
    }
    save() {
        const query = 'INSERT INTO testimonials (user_name, email, message) VALUES (?, ?, ?)';
        const values = [this.username, this.email, this.message];
    
        return new Promise((resolve, reject) => {
          connection.query(query, values, (error, results) => {
            if (error) {
              return reject(error);
            }
            resolve(results);
          });
        });
      }
    
}
module.exports = Testimonial;