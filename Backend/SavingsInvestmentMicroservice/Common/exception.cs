﻿namespace Savingsmicro.Common.exception
{
    
        /// <summary>
        /// Exception thrown when a requested resource is not found in the system.
        /// </summary>
        public class NotFoundException : Exception
        {
            public NotFoundException()
                : base()
            {
            }

            public NotFoundException(string message)
                : base(message)
            {
            }

            public NotFoundException(string message, Exception innerException)
                : base(message, innerException)
            {
            }

            public NotFoundException(string name, object key)
                : base($"Entity \"{name}\" ({key}) was not found.")
            {
            }
        }
    
}
