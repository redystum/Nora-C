#ifndef NORA_C_SHARED_H
#define NORA_C_SHARED_H

typedef struct {
    int web_port;
    char *web_host;
    int server_port;
    char *server_host;
    int ws_port;
} threads_args_t;

typedef struct {
    threads_args_t *args;
    int auto_run;
} frontend_args_t;

#endif //NORA_C_SHARED_H