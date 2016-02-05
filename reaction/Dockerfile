from alpine

COPY reaction /
COPY index.html /
RUN mkdir /static
COPY static /static

RUN chmod +x /reaction

EXPOSE 4200

CMD ["/reaction"]
