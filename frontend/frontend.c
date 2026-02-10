#include "frontend.h"
#include "../lib/Mongoose/mongoose.h"

static void ev_handler(struct mg_connection *c, int ev, void *ev_data) {
    if (ev == MG_EV_HTTP_MSG) {
        struct mg_http_message *hm = (struct mg_http_message *) ev_data;
        struct mg_http_serve_opts opts = {.root_dir = "./frontend/web"};
        mg_http_serve_dir(c, hm, &opts);
    }
}

void* start_frontend(void* arg) {
    threads_args_t* args = (threads_args_t*) arg;

    char* host = args->host;
    int port = args->port;


    mg_log_set(MG_LL_ERROR);
    struct mg_mgr mgr;
    mg_mgr_init(&mgr);

    char listen_addr[256];
    snprintf(listen_addr, sizeof(listen_addr), "http://%s:%d", host, port);

    mg_http_listen(&mgr, listen_addr, ev_handler, NULL);

    printf("Server started on http://%s:%d\n", host, port);


    while (keep_running) {
        mg_mgr_poll(&mgr, 1000);
    }

    mg_mgr_free(&mgr);

    return 0;
}
