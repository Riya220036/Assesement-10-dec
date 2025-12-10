import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Client } from '../../lib/storage';
import { useInView } from '../../hooks/useInView';

interface ClientsProps {
  clients: Client[];
}

export function Clients({ clients }: ClientsProps) {
  const { ref, isInView } = useInView();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="clients" className="py-24 bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-20 w-96 h-96 bg-gradient-to-br from-secondary/10 to-purple-200/10 rounded-full blur-3xl"
        />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6"
          >
            <Quote className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wide">Testimonials</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-900 mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Trusted by leading brands and innovative startups worldwide. 
            Here&apos;s what they have to say about working with us.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {clients.map((client) => (
            <motion.div
              key={client.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden cursor-pointer"
            >
              {/* Decorative gradient on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />

              {/* Floating Quote Icon */}
              <motion.div
                initial={{ rotate: 0, scale: 1 }}
                whileHover={{ rotate: 180, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-colors"
              >
                <Quote className="w-16 h-16" />
              </motion.div>

              <div className="relative z-10">
                {/* Star Rating with Animation */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + i * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{ scale: 1.3, rotate: 360 }}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Text */}
                <motion.p
                  className="text-gray-700 mb-8 leading-relaxed italic relative"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-4xl text-primary/20 absolute -left-2 -top-2">&ldquo;</span>
                  {client.description}
                  <span className="text-4xl text-primary/20">&rdquo;</span>
                </motion.p>

                {/* Client Info */}
                <motion.div
                  className="flex items-center gap-4 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <div className="relative">
                    <motion.img
                      src={client.image}
                      alt={client.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Online Status Indicator */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-lg"
                    />
                  </div>
                  <div>
                    <motion.h4
                      className="text-gray-900 font-semibold"
                      whileHover={{ x: 3 }}
                    >
                      {client.name}
                    </motion.h4>
                    <p className="text-gray-500 text-sm">{client.designation}</p>
                  </div>
                </motion.div>
              </div>

              {/* Animated corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 pt-16 border-t border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Happy Clients' },
              { value: '4.9/5', label: 'Average Rating' },
              { value: '99%', label: 'Satisfaction Rate' },
              { value: '24/7', label: 'Support Available' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2"
                  whileHover={{ scale: 1.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}